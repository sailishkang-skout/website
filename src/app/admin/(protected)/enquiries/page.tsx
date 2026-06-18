"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Building2,
  Mail,
  Send,
  CheckCircle2,
  RotateCcw,
  MessageSquareReply,
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  company: string;
  size: string;
  message: string;
  repliedAt?: string | null;
  createdAt: string;
}

interface Result {
  items: Enquiry[];
  total: number;
  page: number;
  pages: number;
}

async function fetchEnquiries(page: number, query: string): Promise<Result> {
  const params = new URLSearchParams({ page: String(page) });
  if (query) params.set("q", query);
  const res = await fetch(`/api/admin/enquiries?${params}`);
  if (!res.ok) throw new Error("Failed to fetch enquiries");
  return res.json();
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-b border-border last:border-0">
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-28 mb-1.5" />
            <Skeleton className="h-3 w-36" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-5 w-14 rounded-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-20" />
          </td>
        </tr>
      ))}
    </>
  );
}

interface ReplyModalProps {
  enquiry: Enquiry | null;
  repliedAt: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSent: (id: string, repliedAt: string) => void;
}

function ReplyModal({ enquiry, repliedAt, open, onOpenChange, onSent }: ReplyModalProps) {
  const [subject, setSubject] = useState("Re: Your enquiry — Skout AI");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  if (!enquiry) return null;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry!._id}/reply`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to send");
      setSent(true);
      onSent(enquiry!._id, json.repliedAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reply");
    } finally {
      setSending(false);
    }
  }

  function handleClose(v: boolean) {
    if (!v) {
      setMessage("");
      setError("");
      setSent(false);
    }
    onOpenChange(v);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl gap-0 p-0 overflow-hidden">
        {/* Modal header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50">
              <MessageSquareReply className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <DialogTitle className="text-base">{enquiry.name}</DialogTitle>
              <DialogDescription className="mt-0.5 flex items-center gap-1 text-xs">
                <Mail className="h-3 w-3" />
                {enquiry.email}
                <span className="mx-1 text-border">·</span>
                <Building2 className="h-3 w-3" />
                {enquiry.company}
                <span className="mx-1 text-border">·</span>
                {enquiry.size}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 px-6 py-5">
          {/* Their message */}
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Their message</p>
            <div className="max-h-32 overflow-y-auto rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm leading-relaxed text-foreground">
              {enquiry.message}
            </div>
            {repliedAt && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                Last replied {format(new Date(repliedAt), "MMM d, yyyy 'at' h:mm a")}
              </p>
            )}
          </div>

          {/* Reply form or success */}
          {sent ? (
            <div className="flex items-center gap-2.5 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>
                Reply sent to <strong>{enquiry.email}</strong>
              </span>
              <button
                onClick={() => setSent(false)}
                className="ml-auto flex items-center gap-1 text-xs text-emerald-600 hover:underline"
              >
                <RotateCcw className="h-3 w-3" /> Reply again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-3">
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">Subject</p>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">Message</p>
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setError("");
                  }}
                  placeholder="Write your reply…"
                  rows={5}
                  className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleClose(false)}
                  className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  {sending ? "Sending…" : "Send Reply"}
                </button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function EnquiriesPage() {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [replyTarget, setReplyTarget] = useState<Enquiry | null>(null);
  const [localReplied, setLocalReplied] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["admin-enquiries", { page, query }],
    queryFn: () => fetchEnquiries(page, query),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setQuery(input);
  }

  function handleReplySent(id: string, repliedAt: string) {
    setLocalReplied((prev) => ({ ...prev, [id]: repliedAt }));
    queryClient.invalidateQueries({ queryKey: ["admin-enquiries"] });
  }

  function getRepliedAt(e: Enquiry): string | null {
    return localReplied[e._id] ?? e.repliedAt ?? null;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Enquiries</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {isLoading ? (
              <Skeleton className="inline-block h-3.5 w-16" />
            ) : (
              `${data?.total ?? 0} total`
            )}
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="text-xs text-muted-foreground animate-pulse">Refreshing…</span>
        )}
      </div>

      {isError && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Failed to load enquiries.
        </p>
      )}

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search name, email, company…"
            className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Search
        </button>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setInput("");
              setPage(1);
            }}
            className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted"
          >
            Clear
          </button>
        )}
      </form>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Company</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Size</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton />
            ) : !data?.items.length ? (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center text-muted-foreground">
                  {query ? `No results for "${query}"` : "No enquiries yet."}
                </td>
              </tr>
            ) : (
              data.items.map((e) => {
                const repliedAt = getRepliedAt(e);
                return (
                  <tr
                    key={e._id}
                    className="border-b border-border last:border-0 hover:bg-muted/40"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{e.name}</span>
                        {repliedAt && (
                          <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                            Replied
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {e.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        {e.company}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs">
                        {e.size}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {format(new Date(e.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setReplyTarget(e)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                      >
                        <MessageSquareReply className="h-3.5 w-3.5" />
                        Reply
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.pages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Page {data.page} of {data.pages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isFetching}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
              disabled={page === data.pages || isFetching}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-muted"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Reply modal */}
      <ReplyModal
        enquiry={replyTarget}
        repliedAt={replyTarget ? getRepliedAt(replyTarget) : null}
        open={replyTarget !== null}
        onOpenChange={(v) => {
          if (!v) setReplyTarget(null);
        }}
        onSent={handleReplySent}
      />
    </div>
  );
}
