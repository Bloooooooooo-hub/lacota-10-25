// app/api/upsert-user/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // 1. On récupère le body envoyé par le front
    const body = await req.json()
    const { phone, role } = body

    if (!phone || !role) {
      return NextResponse.json(
        { error: "phone et role sont requis" },
        { status: 400 }
      )
    }

    // 2. Prépare la mutation Hasura
    const mutation = `
      mutation InsertUser($phone: String!, $role: String!) {
        insert_lacota_users_one(
          object: {
            phone: $phone,
            role: $role
          }
          on_conflict: {
            constraint: users_phone_key,
            update_columns: [phone, role]
          }
        ) {
          id
          phone
          role
          created_at
        }
      }
    `

    // 3. Appel Hasura côté serveur uniquement
    const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT
    const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET

    if (!HASURA_ENDPOINT || !HASURA_ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Config serveur manquante (HASURA_ENDPOINT / HASURA_ADMIN_SECRET)" },
        { status: 500 }
      )
    }

    const resp = await fetch(HASURA_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
        query: mutation,
        variables: { phone, role },
      }),
    })

    const data = await resp.json()

    if (data.errors) {
      console.error("Hasura errors:", data.errors)
      return NextResponse.json(
        { error: "Erreur Hasura", details: data.errors },
        { status: 500 }
      )
    }

    // 4. On renvoie le user créé / mis à jour
    return NextResponse.json(
      {
        userRecord: data.data?.insert_lacota_users_one,
      },
      { status: 200 }
    )
  } catch (err: any) {
    console.error("API /upsert-user error:", err)
    return NextResponse.json(
      { error: err.message || "Erreur serveur" },
      { status: 500 }
    )
  }
}
