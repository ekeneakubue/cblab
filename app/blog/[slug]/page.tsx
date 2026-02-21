import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  body: React.ReactNode;
};

const posts: Record<string, Post> = {
  "understanding-pcr-testing": {
    slug: "understanding-pcr-testing",
    title: "Understanding PCR and molecular testing in the clinic",
    excerpt: "A concise overview of how PCR and related molecular methods support diagnosis, from sample to result, and what to expect when your doctor orders these tests.",
    date: "2025-02-15",
    category: "Diagnostics",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
    body: (
      <>
        <p className="leading-relaxed text-brand-700">
          When your doctor orders a “molecular test” or “PCR test,” you’re getting a window into your health at the level of DNA or RNA. These tests are central to diagnosing infections, guiding cancer care, and screening for genetic conditions. Here’s a straightforward overview of how they work and what to expect.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">What is PCR?</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          PCR (polymerase chain reaction) is a technique that makes millions of copies of a specific segment of genetic material in a sample. By amplifying even tiny amounts of DNA or RNA, the lab can detect the presence of a virus, bacterium, or genetic variant that would otherwise be too scarce to find. That’s why PCR is so useful for diagnosing infections (including COVID-19 and flu) and for detecting certain cancer markers or inherited conditions.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">From sample to result</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Most molecular tests start with a sample from you—often a swab (nose or throat), blood, or sometimes saliva or urine. The sample is sent to the laboratory under controlled conditions. In the lab, technicians extract the genetic material and run it on instruments that perform PCR (and sometimes related steps, depending on the test). Results are usually available within a few hours to a couple of days, depending on the test and lab workflow. Your doctor receives the result and will explain what it means for your care.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Real-time PCR and beyond</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          “Real-time” PCR (often called qPCR or RT-PCR when used for RNA) doesn’t just detect whether a target is present—it can also estimate how much is there. That’s helpful for monitoring how well a treatment is working (for example, viral load in some infections) or for quantifying gene expression in certain cancer tests. Labs may also use other molecular methods alongside PCR to confirm results or to look at multiple targets in one run.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">What you can expect</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Your role is usually simple: follow the instructions for giving the sample (for example, fasting if required, or avoiding mouthwash before a saliva test). If you have questions about why the test was ordered or what the result means, your healthcare provider is the best person to ask. At Classic Biomedical Laboratory, we focus on accuracy, clear reporting, and turnaround times that help your care team make timely decisions.
        </p>

        <p className="mt-10 leading-relaxed text-brand-700">
          Molecular testing is a powerful part of modern medicine. Understanding the basics can help you feel more confident when your doctor recommends a PCR or other molecular test.
        </p>
      </>
    ),
  },
  "lab-results-explained": {
    slug: "lab-results-explained",
    title: "How to read your laboratory results",
    excerpt: "Reference ranges, units, and flags—what they mean and when to follow up with your healthcare provider for a clearer picture of your health.",
    date: "2025-02-08",
    category: "Patient care",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    body: (
      <>
        <p className="leading-relaxed text-brand-700">
          Lab results can look like a wall of numbers and abbreviations. Knowing a few basics helps you understand what you’re looking at and when to talk to your doctor. This guide walks you through the main elements of a typical report.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Reference ranges</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Most results are compared to a “reference range” (sometimes called “normal range”). This range is usually based on healthy populations and shows where most people’s results fall. A result outside the range doesn’t always mean something is wrong—it might be normal for you, or your doctor may already be tracking it. Your provider will put the number in context with your history, symptoms, and other tests.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Units and abbreviations</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Results are reported in standard units (e.g. mg/dL, mmol/L, or IU/L). Different labs may use slightly different units for the same test, so avoid comparing numbers from different reports without checking the units. Abbreviations like “Hb” for hemoglobin or “WBC” for white blood cells are explained in the report legend or on the lab’s website.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Flags and symbols</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Many reports use flags—such as “H” (high), “L” (low), or an asterisk—to highlight results outside the reference range. These are there to draw attention, not to diagnose. Always discuss flagged results with your healthcare provider, who can explain whether follow-up or repeat testing is needed.
        </p>

        <p className="mt-10 leading-relaxed text-brand-700">
          At Classic Biomedical Laboratory, we aim to report results clearly and on time so you and your care team can make informed decisions. When in doubt, your doctor or nurse is the best person to interpret your results for your situation.
        </p>
      </>
    ),
  },
  "role-of-biostatistics": {
    slug: "role-of-biostatistics",
    title: "The role of biostatistics in clinical research",
    excerpt: "Why sound statistics matter in trials and cohort studies, and how our biostatistics team supports robust design and interpretation of biomedical data.",
    date: "2025-01-28",
    category: "Research",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    body: (
      <>
        <p className="leading-relaxed text-brand-700">
          Strong clinical research depends on asking the right questions, collecting the right data, and analyzing them correctly. Biostatistics is the discipline that makes this possible—from designing studies to interpreting results. Here’s how it fits into the research pipeline and how our team supports it.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Study design</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Before any data are collected, biostatisticians help define objectives, choose endpoints, and determine sample size. Good design reduces bias, controls for confounding, and ensures the study can actually answer the research question. Whether it’s a randomized trial, an observational cohort, or a diagnostic accuracy study, the statistical plan is central to validity and efficiency.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Analysis and interpretation</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Once data are in, biostatisticians apply appropriate methods—hypothesis tests, regression, survival analysis, or more advanced techniques—and help interpret the findings. They also quantify uncertainty (e.g. confidence intervals, p-values where relevant) so researchers and readers can judge the strength of the evidence. Clear reporting and visualization make the results accessible to clinicians and decision-makers.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">How we support research</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          At Classic Biomedical Laboratory, our biostatistics team collaborates with investigators on study design, analysis plans, and interpretation of laboratory and clinical data. We work across therapeutic areas and study types, with a focus on rigor, reproducibility, and clarity. If you’re planning a trial or analyzing biomedical data, we can help ensure the statistics support sound conclusions.
        </p>

        <p className="mt-10 leading-relaxed text-brand-700">
          Biostatistics is not just number-crunching—it’s a core part of how we turn data into reliable evidence for better health outcomes.
        </p>
      </>
    ),
  },
  "blood-chemistry-basics": {
    slug: "blood-chemistry-basics",
    title: "Blood chemistry panels: what's in a routine panel?",
    excerpt: "From liver and kidney function to lipids and glucose—a quick guide to common chemistry tests and what they help your doctor assess.",
    date: "2025-01-20",
    category: "Diagnostics",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
    body: (
      <>
        <p className="leading-relaxed text-brand-700">
          A “routine blood panel” or “chemistry panel” often includes several tests in one draw. Together they give a snapshot of organ function, metabolism, and key nutrients. Here’s a brief overview of what’s commonly included and why it matters.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Liver and kidney</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Liver function is often assessed with enzymes (e.g. ALT, AST, ALP) and sometimes bilirubin and albumin. These can reflect inflammation, injury, or metabolic changes. Kidney function is typically evaluated with creatinine and sometimes blood urea nitrogen (BUN) or estimated glomerular filtration rate (eGFR). These help screen for and monitor kidney disease and dosing of certain drugs.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Glucose and lipids</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Blood glucose (fasting or random) is used to screen for and manage diabetes and related conditions. Lipid panels usually include total cholesterol, LDL, HDL, and triglycerides, which inform cardiovascular risk and treatment decisions. Fasting is often required for glucose and lipids so results are comparable and interpretable.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Electrolytes and more</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Electrolytes (sodium, potassium, chloride, bicarbonate) and minerals like calcium are part of many panels. They support diagnosis and monitoring of heart, kidney, and metabolic conditions. Panels may also include markers such as total protein or specific enzymes depending on the clinical question.
        </p>

        <p className="mt-10 leading-relaxed text-brand-700">
          At Classic Biomedical Laboratory we run these tests with strict quality control and clear reporting. Your doctor will use the results together with your history and examination to guide next steps. If you have questions about why a test was ordered or what a result means, your healthcare provider is the best source for personalized explanation.
        </p>
      </>
    ),
  },
  "genomics-in-diagnostics": {
    slug: "genomics-in-diagnostics",
    title: "Genomics in modern diagnostics",
    excerpt: "How sequencing and genomic assays are increasingly used in diagnosis, screening, and treatment selection, and what that means for patients and providers.",
    date: "2025-01-12",
    category: "Research",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1200&q=80",
    body: (
      <>
        <p className="leading-relaxed text-brand-700">
          Genomics—the study of the full set of an organism’s genes and their function—is now a routine part of diagnosis and care in many areas. From inherited conditions to cancer and infectious disease, genomic tests help identify risk, confirm diagnoses, and guide treatment. Here’s a concise overview of how they’re used today.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">From single genes to whole genomes</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Tests can focus on a single gene, a panel of genes, or the whole genome or exome. Single-gene and panel tests are common in cancer (e.g. BRCA, tumor profiling), cardiology, and rare disease. Whole-genome or exome sequencing is used when a broader search is needed, often with the support of genetic counseling and clear consent.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Diagnosis and treatment selection</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          In cancer, genomic profiling of the tumor can reveal mutations that guide targeted therapies or immunotherapy. In infectious disease, sequencing can identify pathogens and resistance markers. In hereditary conditions, a genetic result can confirm a diagnosis, clarify risk for family members, and inform reproductive or clinical decisions.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">What patients and providers can expect</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Genomic testing is usually ordered by a specialist or primary care provider. Pre- and post-test counseling is important when results may affect life decisions or family planning. Turnaround times vary by test type; our lab works to deliver results in a timeframe that supports timely clinical decisions while maintaining accuracy and clear reporting.
        </p>

        <p className="mt-10 leading-relaxed text-brand-700">
          At Classic Biomedical Laboratory we offer genomic and molecular tests as part of a broader diagnostics and research portfolio. We combine technical rigor with a focus on clarity so that patients and providers can use genomic information confidently in care.
        </p>
      </>
    ),
  },
  "quality-in-the-lab": {
    slug: "quality-in-the-lab",
    title: "Quality and accuracy in the laboratory",
    excerpt: "How we maintain high standards through calibration, internal quality control, and participation in external quality assurance programs.",
    date: "2025-01-05",
    category: "Lab life",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?auto=format&fit=crop&w=1200&q=80",
    body: (
      <>
        <p className="leading-relaxed text-brand-700">
          Reliable lab results depend on more than good instruments—they require a system of checks and standards that run every day. At Classic Biomedical Laboratory we build quality into every step, from calibration and internal quality control to external proficiency and accreditation. Here’s how we keep results accurate and trustworthy.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Calibration and maintenance</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Analyzers and instruments are calibrated regularly using traceable standards so that measurements align with accepted reference methods. Preventive maintenance and cleaning are scheduled and documented. This reduces drift and ensures that today’s results are comparable to last week’s and to other labs.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Internal quality control</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Every run includes internal quality control (IQC) samples with known values. We plot results on control charts and investigate any shift or trend before patient results are released. IQC helps us catch problems quickly—reagent lots, environmental changes, or instrument issues—so that only validated runs go out the door.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">External quality assurance</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          We participate in external quality assurance (EQA) programs, where an independent provider sends samples and we report results alongside other labs. This checks our performance against peers and against target values. It’s a key part of accreditation and of our commitment to continuous improvement.
        </p>

        <h2 className="mt-10 text-xl font-bold text-brand-950">Competency and culture</h2>
        <p className="mt-3 leading-relaxed text-brand-700">
          Quality also depends on people. Our staff are trained and competency-assessed on the methods they use. We document procedures, review incidents, and encourage a culture where speaking up about potential issues is expected. Together, calibration, IQC, EQA, and a strong quality culture keep our results accurate and actionable for your care.
        </p>

        <p className="mt-10 leading-relaxed text-brand-700">
          When you or your doctor rely on our lab, you can be confident that quality is built in from sample receipt to reported result.
        </p>
      </>
    ),
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-brand-50 text-brand-950">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>

        <article className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-brand-100 px-2.5 py-1 font-medium text-brand-600">
              {post.category}
            </span>
            <span className="text-brand-400">{post.readTime}</span>
          </div>
          <time
            dateTime={post.date}
            className="mt-2 block text-sm text-brand-400"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-950 md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-600">
            {post.excerpt}
          </p>

          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl bg-brand-100">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>

          <div className="mt-10 border-t border-brand-100 pt-10">
            {post.body}
          </div>
        </article>

        <div className="mt-14 border-t border-brand-100 pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All posts
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
