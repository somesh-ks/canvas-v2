import React, { useState, useRef, useEffect } from "react";
import { Plus, X, Trophy, Medal, Compass, Check } from "lucide-react";
import { presentationTheme } from "../../lib/presentationTheme";
import { getResultsSnapshotSummary } from "../../lib/presentationInsights";

const ui = presentationTheme.classes;
const toneMap = presentationTheme.tones;
const rankIcons = [Trophy, Medal, Compass];
const rankLabels = ["#1", "#2", "#3"];

// Mock attendee list — replace with real session data
const ATTENDEES = [
  { id: "a1",  name: "Irina Anastasiu",   role: "VP Strategy" },
  { id: "a2",  name: "Mathias Lundin",    role: "Head of Product" },
  { id: "a3",  name: "Thor Bossuyt",      role: "Engineering Lead" },
  { id: "a4",  name: "Sara Nkemdirim",    role: "Chief of Staff" },
  { id: "a5",  name: "Daniel Reyes",      role: "Operations Director" },
  { id: "a6",  name: "Priya Kapoor",      role: "People & Culture" },
  { id: "a7",  name: "Jonas Weber",       role: "Finance Lead" },
  { id: "a8",  name: "Camille Fontaine",  role: "Marketing Director" },
  { id: "a9",  name: "Marcus Osei",       role: "Sales Lead" },
  { id: "a10", name: "Leila Hamidi",      role: "Design Lead" },
];

// Deterministic avatar background from name
const AVATAR_COLORS = [
  "bg-[var(--mantine-color-blue-2)] text-[var(--mantine-color-blue-8)]",
  "bg-[var(--mantine-color-grape-2)] text-[var(--mantine-color-grape-8)]",
  "bg-[var(--mantine-color-green-2)] text-[var(--mantine-color-green-8)]",
  "bg-[var(--mantine-color-orange-2)] text-[var(--mantine-color-orange-8)]",
  "bg-[var(--mantine-color-pink-2)] text-[var(--mantine-color-pink-8)]",
  "bg-[var(--mantine-color-yellow-2)] text-[var(--mantine-color-yellow-9)]",
];

function avatarColor(name) {
  const hash = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

// ── Owner chip / picker ──────────────────────────────────────────────────────
function OwnerChip({ owner, onAssign, onClear }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const filtered = query.trim()
    ? ATTENDEES.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.role.toLowerCase().includes(query.toLowerCase())
      )
    : ATTENDEES;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus input when picker opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  if (owner) {
    return (
      <div className="flex items-center gap-2">
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarColor(owner.name)}`}
        >
          {initials(owner.name)}
        </div>
        {/* Name + role */}
        <div className="min-w-0">
          <p className={`text-sm font-semibold leading-tight ${ui.text} truncate`}>
            {owner.name}
          </p>
          <p className={`text-xs ${ui.textSoft} truncate`}>{owner.role}</p>
        </div>
        {/* Clear */}
        <button
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          className={`ml-1 flex-shrink-0 rounded-full p-0.5 hover:bg-[var(--presentation-surface-muted)] transition-colors ${ui.textSoft} hover:text-[var(--presentation-text)]`}
          aria-label="Remove owner"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Chip trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5 text-xs font-semibold transition-all
          ${open
            ? "border-[var(--presentation-text)] bg-[var(--presentation-surface-muted)] text-[var(--presentation-text)]"
            : "border-[var(--presentation-border-strong)] text-[var(--presentation-text-muted)] hover:border-[var(--presentation-text)] hover:text-[var(--presentation-text)]"
          }`}
      >
        <Plus size={12} />
        Assign owner
      </button>

      {/* Picker dropdown */}
      {open && (
        <div
          className={`absolute top-full left-0 mt-2 z-30 w-72 rounded-[20px] shadow-[0_12px_40px_rgba(15,23,42,0.12)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 ${ui.surface} border border-[var(--presentation-border-strong)]`}
        >
          {/* Search */}
          <div className="px-3 pt-3 pb-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search participants…"
              className={`w-full rounded-xl border px-3 py-2 text-sm ${ui.surface} ${ui.border} ${ui.text} placeholder:text-[var(--presentation-text-soft)] outline-none focus:ring-2 focus:ring-[var(--presentation-focus)] transition-shadow`}
            />
          </div>

          {/* List */}
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className={`px-4 py-3 text-sm ${ui.textMuted}`}>No match</li>
            )}
            {filtered.map((attendee) => (
              <li key={attendee.id}>
                <button
                  onClick={() => { onAssign(attendee); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[var(--presentation-surface-muted)] transition-colors`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${avatarColor(attendee.name)}`}>
                    {initials(attendee.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium ${ui.text} truncate`}>{attendee.name}</p>
                    <p className={`text-xs ${ui.textSoft} truncate`}>{attendee.role}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Theme card ───────────────────────────────────────────────────────────────
function ThemeCard({ theme, rank, owner, onAssign, onClear }) {
  const Icon = rankIcons[rank];
  const toneClass = toneMap[theme.color] || toneMap.lavender;

  return (
    <div className={`rounded-[28px] border flex flex-col overflow-hidden transition-all ${toneClass}`}>
      {/* Top: rank + vote */}
      <div className="px-7 pt-7 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`rounded-xl border bg-white/60 p-2 ${toneClass}`}>
            <Icon size={16} />
          </div>
          <span className={`text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>
            {rankLabels[rank]} Priority
          </span>
        </div>
        <span className={`text-sm font-semibold tabular-nums bg-white/60 rounded-full px-3 py-1 ${ui.textSoft} flex-shrink-0`}>
          {theme.votes != null ? `${theme.votes} votes` : `${theme.percentage}%`}
        </span>
      </div>

      {/* Theme title + description */}
      <div className="px-7 pt-4 pb-5 flex-1 space-y-2">
        <h3 className={`text-2xl font-semibold leading-snug ${ui.text}`}>{theme.title}</h3>
        <p className={`text-sm leading-relaxed ${ui.textMuted} line-clamp-2`}>{theme.description}</p>
      </div>

      {/* Divider */}
      <div className="mx-7 border-t border-[var(--presentation-border)] opacity-40" />

      {/* Owner assignment area */}
      <div className="px-7 py-5">
        <p className={`text-[10px] font-semibold uppercase tracking-widest ${ui.textSoft} mb-3`}>Owner</p>
        <OwnerChip owner={owner} onAssign={onAssign} onClear={onClear} />
      </div>

      {/* Subtle progress bar — share of total votes */}
      <div className="px-7 pb-6">
        <div className="h-1.5 rounded-full bg-white/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--presentation-text)] opacity-25 transition-all duration-700"
            style={{ width: `${theme.percentage ?? 50}%` }}
          />
        </div>
        <p className={`text-[11px] mt-1.5 ${ui.textSoft}`}>
          {theme.count} responses · {theme.percentage}% of workshop
        </p>
      </div>
    </div>
  );
}

// ── Slide ────────────────────────────────────────────────────────────────────
export default function ActionPlanV4Slide({ presentationData, votingSession, actionState, onActionStateChange }) {
  const summary = getResultsSnapshotSummary(presentationData, {
    isComplete: votingSession?.phase === "results",
    voteCounts: votingSession?.voteCounts,
    participantsCompleted: votingSession?.participantsCompleted,
  });

  const themes = summary.topThemes.slice(0, 3);

  const getOwner = (themeId) => actionState?.[themeId]?.owner ?? null;
  const setOwner = (themeId, attendee) => {
    onActionStateChange?.({
      ...actionState,
      [themeId]: { ...actionState?.[themeId], owner: attendee },
    });
  };
  const clearOwner = (themeId) => {
    onActionStateChange?.({
      ...actionState,
      [themeId]: { ...actionState?.[themeId], owner: null },
    });
  };

  const assignedCount = themes.filter((t) => getOwner(t.id)).length;

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <p className={`text-sm font-semibold uppercase tracking-widest ${ui.textSoft}`}>
            Ownership
          </p>
          <h2 className={`text-3xl font-semibold tracking-tight ${ui.text}`}>
            Who owns each priority?
          </h2>
          <p className={`text-base ${ui.textMuted} max-w-xl`}>
            Tap <strong>+ Assign owner</strong> on each theme to pick from today's participants.
          </p>
        </div>

        {/* Live completion badge */}
        <div
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold flex-shrink-0 transition-all ${
            assignedCount === themes.length
              ? "border-[var(--mantine-color-green-4)] bg-[var(--mantine-color-green-0)] text-[var(--mantine-color-green-8)]"
              : `${ui.border} ${ui.surface} ${ui.textMuted}`
          }`}
        >
          {assignedCount === themes.length && <Check size={14} />}
          {assignedCount} / {themes.length} assigned
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {themes.map((theme, index) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            rank={index}
            owner={getOwner(theme.id)}
            onAssign={(attendee) => setOwner(theme.id, attendee)}
            onClear={() => clearOwner(theme.id)}
          />
        ))}
      </div>

      {/* Attendee overview strip */}
      <div className={`mt-8 rounded-2xl border px-6 py-4 flex items-center justify-between gap-4 ${ui.panel}`}>
        <div className="flex items-center gap-3">
          {/* Avatar cluster */}
          <div className="flex -space-x-2">
            {ATTENDEES.slice(0, 6).map((a) => (
              <div
                key={a.id}
                title={a.name}
                className={`w-7 h-7 rounded-full border-2 border-[var(--presentation-bg)] flex items-center justify-center text-[10px] font-bold ${avatarColor(a.name)}`}
              >
                {initials(a.name)}
              </div>
            ))}
            {ATTENDEES.length > 6 && (
              <div className={`w-7 h-7 rounded-full border-2 border-[var(--presentation-bg)] flex items-center justify-center text-[10px] font-semibold ${ui.mutedPanel} ${ui.textSoft}`}>
                +{ATTENDEES.length - 6}
              </div>
            )}
          </div>
          <p className={`text-sm font-medium ${ui.textMuted}`}>
            {ATTENDEES.length} participants available to assign
          </p>
        </div>

        {assignedCount === themes.length && (
          <p className={`text-sm font-semibold text-[var(--mantine-color-green-7)]`}>
            All priorities have an owner ✓
          </p>
        )}
      </div>
    </div>
  );
}
