import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui";
import { contactMailto, isContactTopic, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "合作洽詢",
  description: "聯絡 CasinoDex 贊助與合作。信件寄至 AgentMail 合作信箱。",
};

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const params = await searchParams;
  const topicParam = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  const defaultTopic = isContactTopic(topicParam) ? topicParam : "partnership";

  return (
    <Container className="py-10 sm:py-12">
      <p className="text-xs font-semibold tracking-[0.16em] text-warn uppercase">
        18+ · 合作與贊助
      </p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl">合作洽詢</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">
        唯一對外信箱（寫在 <code className="text-paper">content/site.json</code>）：
        <a className="ml-1 underline" href={contactMailto()}>
          {site.contactEmail}
        </a>
        。請勿寄到個人 Gmail 或其他私人信箱。
      </p>
      <div className="mt-8 max-w-xl rounded-2xl border border-line bg-panel p-5">
        <ContactForm defaultTopic={defaultTopic} />
      </div>
    </Container>
  );
}
