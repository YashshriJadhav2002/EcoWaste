import React from 'react';
import { useParams } from 'react-router-dom';

const Success = () => {
    const { name } = useParams();

    return (
        <div className="rounded shadow-lg mb-6 bg-white justify-center items-center border-2 m-12 p-8 max-w-md mx-auto mt-12">
        <img
            src="https://craftizen.org/wp-content/uploads/2019/02/successful_payment_388054.png"
            alt="Success Icon"
            className="w-20 h-auto mx-auto mb-8"
        />
        <br></br>
        <div className="text-center">
            <h1>
                <p className="text-green-500 text-2xl font-bold">
                    Order Placed Successfully !!
                </p>
            </h1>

            <button
                className="bg-headings text-white border-none px-6 py-3 rounded-full mt-8 cursor-pointer"
                onClick={() => {
                    if (name === 'company') window.location.href = '/CompanyHome';
                    else if (name === 'seller') window.location.href = '/SellerHome';
                    else window.location.href = '/VendorHome';
                }}
            >
                Go to home
            </button>
        </div>
    </div>
    );
};

export default Success;
