import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Hero } from '../components/Hero';
import { Skills } from '../components/Skills';
import { Work } from '../components/Work';
import { PageMetadata } from '../components/PageMetadata';

export function Home() {
    return (
        <>
            <PageMetadata name="home" />
            <Hero />
            <Work />
            <About />
            <Skills />
            <Contact />
        </>
    );
}
