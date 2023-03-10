import Header from 'components/Header';
import Footer from 'components/Footer';

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Header />
            <section className="Container">{children}</section>
            <Footer />
        </>
    );
}
