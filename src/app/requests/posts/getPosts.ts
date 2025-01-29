'use server'

import { getUser, getUsers } from '../hooks/getUsers'

export async function getPosts() {
    const users = await getUsers()
    const user = await getUser()
    console.log(users, user)
}