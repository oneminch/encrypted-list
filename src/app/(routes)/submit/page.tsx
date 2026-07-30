import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import pageMeta from "@/lib/metadata";
import PageDivider from "@/components/misc/page-divider";
import SubmissionFormSkeleton from "@/components/misc/skeletons/submission-form-skeleton";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/footer";
// import PromoBanner from "@/components/misc/promotional/promo-banner";
// import { type BannerPromotion } from "@/lib/types";

const SubmissionForm = dynamic(
  () => import("@/components/misc/submission-form"),
  {
    loading: () => <SubmissionFormSkeleton />
    // ssr: false
  }
);

const submissionRequirements = [
  "EncryptedList is a directory of software tools with zero-knowledge or end-to-end encryption as a core security feature.",
  "Privacy-first design should be part of the core experience (even when encrypted features are opt-in or limited to a subset of the tool).",
  "Submissions that don't fit under these guidelines may not be accepted.",
  "Thank you for helping me make EncryptedList better."
];

export const metadata: Metadata = {
  title: pageMeta["/submit"].title,
  description: pageMeta["/submit"].description,
  openGraph: {
    title: pageMeta["/submit"].title,
    description: pageMeta["/submit"].description
  },
  twitter: {
    title: pageMeta["/submit"].title,
    description: pageMeta["/submit"].description
  }
};

const SubmitPage: React.FC = () => {
  // const promoInfo = {
  //   iconUrl: "https://icons.encryptedlist.xyz/logo.svg",
  //   title: "EncryptedList",
  //   shortDescription: "Discover Secure-by-Design Software.",
  //   cta: {
  //     label: "Learn More",
  //     url: "https://encryptedlist.xyz/"
  //   },
  //   tailwindBackgroundColorVariable: "--color-yellow-500",
  //   tailwindForegroundColorVariable: "--color-zinc-800"
  // } satisfies BannerPromotion;

  return (
    <>
      <section className="mb-2">
        {/* <PromoBanner {...promoInfo} /> */}
        <Header className="hidden md:flex" />
        <Hero />
      </section>

      <PageDivider />

      <section className="py-8 px-4 sm:px-6 mx-auto w-full sm:w-5/6 lg:w-4/5 max-w-5xl grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-6 lg:gap-8 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg">
        <aside className="w-11/12 lg:w-full max-w-md flex flex-col items-start justify-center mx-auto border-b lg:border-r lg:border-b-0 border-dashed border-zinc-200/50 dark:border-zinc-700/50 p-6 sm:p-7 h-full">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Submission Guidelines
          </h2>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-200 marker:text-yellow-500 dark:marker:text-yellow-400">
            {submissionRequirements.map(requirement => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </aside>

        <div className="w-11/12 sm:w-full max-w-md p-6 sm:p-7 mx-auto flex items-center justify-center">
          <SubmissionForm />
        </div>
      </section>

      <PageDivider />

      <Footer />
    </>
  );
};

export default SubmitPage;
