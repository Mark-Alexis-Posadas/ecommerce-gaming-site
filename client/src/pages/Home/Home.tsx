import { useEffect, useState } from "react";
import PageTitle from "../../components/page/PageTitle";
import Section from "../../components/page/Section";
import PageContainer from "../../components/page/PageContainer";

const images = ["/banner/banner-one.avif", "/banner/banner-two.avif"];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        className="min-h-[600px] bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${images[index]})` }}
      ></section>

      <Section>
        <PageContainer>
          <PageTitle>Featured Products</PageTitle>
        </PageContainer>
      </Section>
      <Section>
        <PageContainer>
          <PageTitle>Categories</PageTitle>
        </PageContainer>
      </Section>
    </>
  );
}
