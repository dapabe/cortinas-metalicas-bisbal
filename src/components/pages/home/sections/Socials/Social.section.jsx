import { SectionDivider } from "#/components/SectionDivider";
import { SectionTitle } from "#/components/SectionTitle";
import { AnchorSectionNames } from "#/constants/AnchorSectionNames";
import { SocialLinks } from "#/constants/SocialLinks";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export function SocialSection() {


    return (
        <section
            id={AnchorSectionNames.Socials}
            className="container mx-auto space-y-4 flex flex-col"
        >
            <SectionTitle
                anchorSectionName={AnchorSectionNames.Socials}
            >
                Siguenos en nuestras{" "}
                <span className="underline decoration-primary">cuentas oficiales</span>
            </SectionTitle>
            <div className="stats stats-vertical lg:stats-horizontal shadow-md w-max mx-auto">
                <div className="stat">
                    <div className="stat-value">
                        <Link
                            aria-label="Enlace a la página oficial de Facebook"
                            href={SocialLinks.Instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link-hover inline-flex items-center gap-x-2"
                        >
                            <Image
                                src="/ig-logo.png"
                                width={40}
                                height={40}
                                alt="Logo oficial de Instagram"
                                className="inline-block"
                            />
                            <span>
                                Instagram
                            </span>
                            <ArrowTopRightOnSquareIcon className="size-6 inline-block" />
                        </Link>
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-value">
                        <Link
                            aria-label="Enlace a la página oficial de Facebook"
                            href={SocialLinks.Facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link-hover inline-flex items-center gap-x-2"
                        >
                            <Image
                                src="/fb-logo.png"
                                width={40}
                                height={40}
                                alt="Logo oficial de Facebook"
                            />
                            <span>
                                Facebook
                            </span>
                            <ArrowTopRightOnSquareIcon className="size-6 inline-block" />
                        </Link>
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-value">
                        <Link
                            aria-label="Enlace al chat oficial de WhatsApp"
                            href={SocialLinks.WhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link-hover inline-flex items-center gap-x-2"
                        >
                            <Image
                                src="/whatsapp.svg"
                                width={40}
                                height={40}
                                alt="Logo oficial de WhatsApp"
                            />
                            <span>
                                WhatsApp
                            </span>
                            <ArrowTopRightOnSquareIcon className="size-6 inline-block" />
                        </Link>
                    </div>
                </div>
            </div>
            <SectionDivider />
        </section>
    )
}