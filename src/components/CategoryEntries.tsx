import Link from "next/link";
import { CATEGORY_BLURB, CATEGORY_LABEL } from "@/lib/site";
import { CATEGORIES } from "@/lib/types";

export function CategoryEntries() {
  return (
    <section>
      <h2 className="text-sm font-bold text-paper">依分類瀏覽</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`/directory?category=${category}`}
            className="border border-line bg-bg px-4 py-4 hover:bg-panel"
          >
            <p className="text-base font-bold text-paper">
              {CATEGORY_LABEL[category]}
            </p>
            <p className="mt-1 text-sm leading-5 text-mute">
              {CATEGORY_BLURB[category]}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
