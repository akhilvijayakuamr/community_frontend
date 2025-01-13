import { useEffect } from "react";
import { UserHeader } from "../home/UserHeader";
export const BASE_URL = import.meta.env.VITE_BASE_URL
import PremiumImage from '../../../assets/images/premium.jpg'
import { useLocation } from "react-router-dom";
import QueryString from "query-string"


export default function Premium() {
    const location = useLocation();

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        // const query = new URLSearchParams(window.location.search);
        const values = QueryString.parse(location.search);
        console.log(values);

        if (values.success) {
            console.log("Order placed! You will receive an email confirmation.");
        }

        if (values.canceled) {
            console.log(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return (
        <div>
            <UserHeader />
            <section className="premium-subscription-section bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-8 sm:px-12 lg:px-20 xl:px-40 min-h-screen flex items-center">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="product-info text-center md:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                                Experience Premium Access
                            </h1>
                            <p className="text-lg text-gray-400 mb-6">
                                Unlock exclusive features, benefits, and content for just{"Video call and Chat "}
                                <span className="text-yellow-400 font-semibold">₹1000.00 / Life long</span>.
                            </p>
                            <form action={`${BASE_URL}/communication/create-checkout-session/`} method="POST">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-700 text-gray-900 font-bold text-lg rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                        </div>

                        <div className="product-image">
                            <img
                                src={PremiumImage}
                                alt="Premium product cover"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}