"use client";

/**
 * Table with basic formatting and DaisyUI styling.
 */

// External Modules ----------------------------------------------------------

//import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
//import { useState } from "react";
//import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import { User } from "@/types/types";

// Public Objects ------------------------------------------------------------

export type BasicTableProps = {
  // Dummy user data
  users: User[],
}

export function BasicTable({ users }: BasicTableProps) {

  return (
    <div className="card bg-info/50 border-2 rounded-2xl">
      <div className="card-body">
        <h2 className="card-title justify-center">
          Basic Table
        </h2>
        <table className="table table-zebra w-full">
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
   )

}
