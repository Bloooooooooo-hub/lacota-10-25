import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      phone,
      email,
      firstName,
      lastName,
      gender,
      birthDate,
      profession,
      role = "passenger",
      provider,
    } = body

    // Validation basique
    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email ou téléphone obligatoire" },
        { status: 400 }
      )
    }

    // ✅ Mutation adaptée à ta table `users`
    const mutation = `
      mutation UpsertUser(
        $phone: String,
        $email: String,
        $first_name: String,
        $last_name: String,
        $gender: String,
        $birth_date: date,
        $profession: String,
        $role: String
      ) {
        insert_users_one(
          object: {
            phone: $phone,
            email: $email,
            first_name: $first_name,
            last_name: $last_name,
            gender: $gender,
            birth_date: $birth_date,
            profession: $profession,
            role: $role
          },
          on_conflict: {
            constraint: users_email_key,
            update_columns: [
              phone,
              first_name,
              last_name,
              gender,
              birth_date,
              profession,
              role,
              updated_at
            ]
          }
        ) {
          id
          email
          phone
          first_name
          last_name
          role
          created_at
        }
      }
    `

    const HASURA_URL = process.env.HASURA_URL
    const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET

    if (!HASURA_URL || !HASURA_ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Config serveur manquante (HASURA_URL / HASURA_ADMIN_SECRET)" },
        { status: 500 }
      )
    }

    const resp = await fetch(HASURA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          phone,
          email,
          first_name: firstName,
          last_name: lastName,
          gender,
          birth_date: birthDate,
          profession,
          role,
        },
      }),
    })

    const data = await resp.json()

    if (data.errors) {
      console.error("❌ Hasura error:", data.errors)
      return NextResponse.json({ error: data.errors }, { status: 500 })
    }

    // ✅ Si le user est un passager, créer aussi une entrée dans la table passengers
    const userId = data.data.insert_users_one.id
    if (role === "passenger") {
      const passengerMutation = `
        mutation InsertPassenger($user_id: uuid!) {
          insert_passengers_one(object: { user_id: $user_id }) {
            id
          }
        }
      `
      await fetch(HASURA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
          query: passengerMutation,
          variables: { user_id: userId },
        }),
      })
    }

    return NextResponse.json({ userRecord: data.data.insert_users_one }, { status: 200 })
  } catch (err: any) {
    console.error("Erreur /upsert-user:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
