import {assets} from '../assets/assets';
export default function Example() {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
      <h1 className="text-3xl font-semibold text-center mx-auto mt-10">
        About our shop
      </h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto mb-10">
        A fresh selection of high-quality groceries — carefully sourced to bring you the best products for your home and kitchen.
      </p>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
        <div className="size-[520px] rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>
        <img
          className="max-w-sm w-full rounded-xl h-auto"
          src={assets.about_us_image}
          alt=""
        />
        <div>
          <h1 className="text-3xl font-semibold">Our Latest Offers</h1>
          <p className="text-sm text-slate-500 mt-2">
            Discover seasonal fruits, vegetables, and pantry essentials — always fresh, always affordable.
          </p>

          <div className="flex flex-col gap-10 mt-6">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-600">
                  Fresh & Fast Delivery
                </h3>
                <p className="text-sm text-slate-500">
                  Lightning-fast delivery — get your groceries delivered to your doorstep quickly and safely.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-600">
                  Quality You Can Trust
                </h3>
                <p className="text-sm text-slate-500">
                  Handpicked products, from farm to table, ensuring freshness and premium quality in every item.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-600">
                  Easy Shopping Experience
                </h3>
                <p className="text-sm text-slate-500">
                  User-friendly website for quick browsing, adding to cart, and checkout — supporting all devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}