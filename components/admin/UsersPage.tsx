'use client'

import { useState } from 'react'
import { Input, Button } from '@heroui/react'
import { Card, CardBody } from '@heroui/card'

type User = {
  id: number
  name: string
  email: string
  last_active: string
  role: 'admin' | 'user'
}

export default function UsersPage() {
  const [search, setSearch] = useState('')

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John',
      email: 'john@mail.com',
      last_active: '18-55-2105:555',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane',
      email: 'jane@mail.com',
      last_active: '18-55-2105:555',
      role: 'user',
    },
  ])

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const toggleRole = (id: number) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' }
          : u
      )
    )
  }

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      {/* Search */}
      <Input
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <Card>
        <CardBody className="p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Active</th>
                <th className="p-2">Role</th>
                <th className="p-2 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.last_active}</td>
                  <td className="p-2">
                    <span
                      className={
                        u.role === 'admin'
                          ? 'text-purple-500'
                          : 'text-gray-500'
                      }
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-2 text-right space-x-2">
                    <Button
                      size="sm"
                      onClick={() => toggleRole(u.id)}
                    >
                      Toggle Role
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}