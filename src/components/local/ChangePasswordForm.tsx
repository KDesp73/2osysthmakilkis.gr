"use client";

import { useState, useTransition } from "react";
import PasswordField from "@/components/local/PasswordField";
import { Button } from "../ui/button";
import { changePassword } from "@/actions/admin/password";
import { logout } from "@/actions/auth";

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    startTransition(async () => {
      const data = await changePassword(oldPassword, newPassword);
      if (data.success) {
        await logout();
      } else {
        setMessage(data.error ?? "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md">
      <PasswordField
        id="old-password"
        name="oldPassword"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <PasswordField
        id="new-password"
        name="newPassword"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        showStrength
      />
      <PasswordField
        id="confirm-password"
        name="confirmPassword"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Change Password"}
      </Button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
