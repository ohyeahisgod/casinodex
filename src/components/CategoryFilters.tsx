import Link from "next/link";
import type { Category, OrganicSort } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/site";

export function CategoryFilters({
  category,
  sort,
}: {
  category?: Category;
  sort: OrganicSort;
}) {
  const chips: { href: string; label: string; active: boolean }[] = [
    {
      href: `/directory?sort=${sort}`,
      label: "全部",
      active: !category,
    },
    ...CATEGORIES.map((item) => ({
      href: `/directory?category=${item}&sort=${sort}`,
      label: CATEGORY_LABEL[item],
      active: category === item,
    })),
  ];

  const query = new URLSearchParams();
  if (category) query.set("category", category);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <Link
            key={chip.label}
            href={chip.href}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              chip.active
                ? "border-paper bg-paper text-bg"
                : "border-line text-mute hover:text-paper"
            }`}
          >
            {chip.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <Link
          href={`/directory?${new URLSearchParams({ ...Object.fromEntries(query), sort: "default" }).toString()}`}
          className={sort === "default" ? "text-paper" : "text-mute hover:text-paper"}
        >
          預設排序
        </Link>
        <span className="text-line">/</span>
        <Link
          href={`/directory?${new URLSearchParams({ ...Object.fromEntries(query), sort: "name" }).toString()}`}
          className={sort === "name" ? "text-paper" : "text-mute hover:text-paper"}
        >
          名稱 A–Z
        </Link>
      </div>
    </div>
  );
}
