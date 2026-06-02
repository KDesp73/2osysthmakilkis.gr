"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import PasswordField from "./PasswordField";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  listUsers,
  createUser,
  deleteUser,
  type UserRow,
} from "@/actions/admin/users";

export default function UserManager() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const fetchUsers = useCallback(async () => {
    const result = await listUsers();
    if (result.success && "users" in result) {
      setUsers(result.users);
    } else if (!result.success) {
      setError(result.error ?? "Failed to load users");
    }
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const handleCreate = () => {
    startTransition(async () => {
      setError("");
      const result = await createUser(username, password);
      if (result.success) {
        setUsername("");
        setPassword("");
        await fetchUsers();
      } else {
        setError(result.error ?? "Failed to create user");
      }
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      setError("");
      const result = await deleteUser(id);
      if (result.success) {
        await fetchUsers();
      } else {
        setError(result.error ?? "Failed to delete user");
      }
    });
  };

  return (
    <div className="space-y-6">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordField
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="default"
              onClick={handleCreate}
              disabled={isPending}
            >
              Create User
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Users</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex justify-between items-center rounded-lg border p-3 bg-muted/30"
              >
                <span className="font-medium">{u.username}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(u.id)}
                  disabled={isPending}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
