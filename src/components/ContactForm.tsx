"use client";

import { useMemo, useState } from "react";
import {
  CONTACT_TOPICS,
  contactMailto,
  site,
  type ContactTopic,
} from "@/lib/site";

const TOPIC_KEYS = Object.keys(CONTACT_TOPICS) as ContactTopic[];

export function ContactForm({
  defaultTopic = "sponsor",
}: {
  defaultTopic?: ContactTopic;
}) {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState<ContactTopic>(defaultTopic);
  const [message, setMessage] = useState("");

  const href = useMemo(() => {
    const subject = `[CasinoDex] ${CONTACT_TOPICS[topic]} — ${name || "未署名"}`;
    const body = [
      `主旨：${CONTACT_TOPICS[topic]}`,
      `名稱：${name || "—"}`,
      `回覆信箱：${fromEmail || "—"}`,
      `公司／品牌：${company || "—"}`,
      "",
      message || "（尚未填寫內容）",
      "",
      "—",
      "此信由 CasinoDex 網站洽詢表單產生，收件為 AgentMail 合作信箱。",
    ].join("\n");
    return contactMailto(subject, body);
  }, [name, fromEmail, company, topic, message]);

  return (
    <form
      className="space-y-4"
      action={href}
      method="get"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.href = href;
      }}
    >
      <p className="text-sm leading-6 text-mute">
        表單會寄到 CasinoDex 合作信箱{" "}
        <a className="text-paper underline" href={contactMailto()}>
          {site.contactEmail}
        </a>
        ，不是個人信箱。
      </p>
      <label className="block text-sm">
        你的名稱
        <input
          required
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-paper"
        />
      </label>
      <label className="block text-sm">
        回覆用 Email
        <input
          required
          type="email"
          name="from"
          value={fromEmail}
          onChange={(event) => setFromEmail(event.target.value)}
          className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-paper"
        />
      </label>
      <label className="block text-sm">
        公司／品牌（選填）
        <input
          name="company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-paper"
        />
      </label>
      <label className="block text-sm">
        主旨
        <select
          name="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value as ContactTopic)}
          className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-paper"
        >
          {TOPIC_KEYS.map((key) => (
            <option key={key} value={key}>
              {CONTACT_TOPICS[key]}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        內容
        <textarea
          required
          name="message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-paper"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-bg"
      >
        寄到 {site.contactEmail}
      </button>
    </form>
  );
}
