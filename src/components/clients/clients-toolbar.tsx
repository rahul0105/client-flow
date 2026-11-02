
"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  List,
  LayoutGrid,
  Plus,
  ChevronDown,
} from "lucide-react";

type ClientsToolbarProps = {
  onAddClient?: () => void;
};

export function ClientsToolbar({ onAddClient }: ClientsToolbarProps) {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [view, setView] = useState<"list" | "grid">("list");
  const [status, setStatus] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [createdDate, setCreatedDate] = useState("Any time");
  const [sortBy, setSortBy] = useState("Name (A-Z)");

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search clients..."
            className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            aria-label="Search clients"
          />
        </div>

        {/* Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setFilterOpen((open) => !open);
                setSortOpen(false);
              }}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-muted"
              aria-expanded={filterOpen}
            >
              <SlidersHorizontal className="size-4" />
              Filter
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>

            {filterOpen && (
              <div className="absolute right-0 z-20 mt-2 w-64 rounded-lg border border-border bg-card p-4 shadow-lg">
                <p className="text-sm font-semibold">Filter Clients</p>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Status
                  </p>

                  {["All", "Active", "Inactive"].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name="client-status"
                        checked={status === option}
                        onChange={() => setStatus(option)}
                        className="accent-primary"
                      />
                      {option}
                    </label>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Projects
                  </p>

                  {["All", "Has Projects", "No Projects"].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name="client-projects"
                        checked={projectFilter === option}
                        onChange={() => setProjectFilter(option)}
                        className="accent-primary"
                      />
                      {option}
                    </label>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Created Date
                  </p>

                  {["Any time", "This week", "This month", "Last 3 months"].map(
                    (option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <input
                          type="radio"
                          name="client-created-date"
                          checked={createdDate === option}
                          onChange={() => setCreatedDate(option)}
                          className="accent-primary"
                        />
                        {option}
                      </label>
                    ),
                  )}
                </div>

                <div className="mt-4 flex justify-between border-t border-border pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("All");
                      setProjectFilter("All");
                      setCreatedDate("Any time");
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear filters
                  </button>

                  <button
                    type="button"
                    onClick={() => setFilterOpen(false)}
                    className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Apply filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setSortOpen((open) => !open);
                setFilterOpen(false);
              }}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-muted"
              aria-expanded={sortOpen}
            >
              <ArrowUpDown className="size-4" />
              Sort
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>

            {sortOpen && (
              <div className="absolute right-0 z-20 mt-2 w-52 rounded-lg border border-border bg-card p-2 shadow-lg">
                {[
                  "Name (A-Z)",
                  "Name (Z-A)",
                  "Recently Added",
                  "Oldest Added",
                  "Recently Updated",
                  "Most Projects",
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSortBy(option);
                      setSortOpen(false);
                    }}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm hover:bg-muted ${
                      sortBy === option
                        ? "bg-primary/5 font-medium text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div className="inline-flex h-10 items-center rounded-md border border-border bg-background p-1">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`flex size-8 items-center justify-center rounded ${
                view === "list"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              aria-label="List view"
              aria-pressed={view === "list"}
            >
              <List className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => setView("grid")}
              className={`flex size-8 items-center justify-center rounded ${
                view === "grid"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>

          {/* Add Client */}
          <button
            type="button"
            onClick={onAddClient}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
}
