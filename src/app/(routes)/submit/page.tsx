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
  "EncryptedList focuses on third-party apps that claim zero-knowledge or end-to-end encryption in at least part of the product.",
  "Privacy-first design should be clear in the core experience, even when encrypted features are opt-in or limited to specific workflows.",
  "A publicly accessible product URL is needed for review.",
  "Submission details should make it clear where encryption is used and how it supports user privacy.",
  "Apps that appear deceptive, unsafe, or malware-related are not listed."
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
        <aside className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-5 sm:p-6 h-fit">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Submission Requirements
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            This helps keep listings aligned with apps like Bitwarden, Proton
            Mail, and Signal.
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
            {submissionRequirements.map(requirement => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </aside>

        <div className="flex items-center justify-center">
          <SubmissionForm />
        </div>
      </section>

      <PageDivider />

      <Footer />
    </>
  );
};

export default SubmitPage;
