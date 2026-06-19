import { ComfortaaSemiBold } from "@/_assets/fonts/comfortaa/ComfortaaFont";

export const AppInfoData = {
    name: 'Own One',
    phone: '0782 814471 / 0713 117190',
    address: 'Harare, Zimbabwe',
    email: 'info@ownone.co.zw',
    socials: [
        { name: 'facebook', href: '#' },
        { name: 'instagram', href: '#' },
        { name: 'tiktok', href: '#' },
        { name: 'whatsapp', href: '#' },
    ],
    about: {
        intro: `At Own One Vehicles, we are dedicated to helping you drive your aspirations. 
            We streamline the process of importing high-quality vehicles, giving you direct access 
            to premier international inventory with unmatched reliability and professional service.`,
        main: <>
            <p>
                Partnering with industry leaders like BE FORWARD, we bring genuine
                Japanese quality straight to you, ensuring that getting behind the
                wheel of your ideal vehicle is secure, transparent, and stress-free.
            </p>
            <div className="">
                <h5 className={`${ComfortaaSemiBold.className} text-xl`}>Why Choose Us?</h5>
                <ul className="list-disc pl-5">
                    <li>
                        Import Your Dream Car Today: Skip the hassle. We handle the
                        complexities of sourcing and importing so you can focus on choosing
                        the perfect vehicle for your lifestyle.
                    </li>
                    <li>
                        Flexible 50% Deposit Plan: We make ownership accessible. Secure your
                        vehicle with a 50% deposit, and comfortably clear the remaining balance
                        over 2 months.
                    </li>
                    <li>
                        Guaranteed Quality: Through our strategic alignment with global vehicle
                        exporters, we ensure your car meets rigorous quality standards before
                        it ever reaches you.
                    </li>
                </ul>
            </div>
            <div>
                <h5 className={`${ComfortaaSemiBold.className} text-xl`}>Get In Touch</h5>
                <p>
                    Ready to take the next step? Contact our team today to find your vehicle or get a
                    custom import quote.
                </p>
            </div>

        </>
    }
}