"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@ui/components";
import { ApiOutput } from "api";
import { useTranslations } from "next-intl";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useUser } from "@saas/auth/hooks";
import { UserAvatar } from "@shared/components";
import { apiClient } from "@shared/lib";
import { useToast } from "@ui/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TeamRoleSelect } from "./TeamRoleSelect";

type TeamMembershipsOutput = ApiOutput["team"]["memberships"];

export function TeamMembersList({
  memberships,
}: {
  memberships: TeamMembershipsOutput;
}) {
  const t = useTranslations();
  const router = useRouter();
  const { user, teamRole } = useUser();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { toast } = useToast();

  const removeMemberMutation = apiClient.team.removeMember.useMutation();

  const columns: ColumnDef<TeamMembershipsOutput[number]>[] = [
    {
      accessorKey: "user",
      header: "",
      accessorFn: (row) => row.user,
      cell: ({ row }) =>
        row.original.user ? (
          <div className="flex items-center gap-2">
            <UserAvatar
              name={row.original.user.name ?? row.original.user.email}
              avatarUrl={row.original.user?.avatar_url}
            />
            <div>
              <strong className="block">{row.original.user.name}</strong>
              <small className="text-muted-foreground">
                {row.original.user.email}
              </small>
            </div>
          </div>
        ) : null,
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex flex-row justify-end gap-2">
            <TeamRoleSelect
              value={row.original.role}
              onSelect={() => {}}
              disabled={teamRole !== "OWNER" || row.original.is_creator}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Icon.more />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  disabled={row.original.is_creator}
                  className="text-error"
                  onClick={() => {
                    const loadingToast = toast({
                      variant: "loading",
                      description: t(
                        "settings.team.members.notifications.removeMember.loading.description",
                      ),
                    });
                    removeMemberMutation.mutate(
                      {
                        membershipId: row.original.id,
                      },
                      {
                        onSettled: () => {
                          loadingToast.dismiss();
                        },
                        onSuccess: () => {
                          toast({
                            variant: "success",
                            description: t(
                              "settings.team.members.notifications.removeMember.success.description",
                            ),
                          });
                          router.refresh();
                        },
                        onError: () => {
                          toast({
                            variant: "error",
                            description: t(
                              "settings.team.members.notifications.removeMember.error.description",
                            ),
                          });
                        },
                      },
                    );
                  }}
                >
                  {row.original.user?.id === user?.id ? (
                    <>
                      <Icon.logout className="mr-2 h-4 w-4" />
                      {t("settings.team.members.removeMember")}
                    </>
                  ) : (
                    <>
                      <Icon.delete className="mr-2 h-4 w-4" />
                      {t("settings.team.members.removeMember")}
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: memberships,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className=" rounded-md border">
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
