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
    <Container className="py-5 sm:py-6">
      <p className="text-xs text-warn">18+ · 合作與贊助</p>
      <h1 className="mt-1 text-xl font-bold sm:text-2xl">合作洽詢</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">
        唯一對外信箱：
        <a className="ml-1 underline" href={contactMailto()}>
          {site.contactEmail}
        </a>
      </p>
      <div className="mt-5 max-w-xl border border-line bg-panel p-4">
        <ContactForm defaultTopic={defaultTopic} />
      </div>
    </Container>
  );
}
