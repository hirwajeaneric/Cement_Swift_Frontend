const HomeBanner = () => {
    return (
        <section
            className="relative bg-[url(http://localhost:3000/images/Banner_Image_Cement_Swift.jpg)] bg-cover bg-center bg-no-repeat"
        >
            <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">Get access to the best quality cement</h1>

                    <p className="mt-4 max-w-lg sm:text-xl/relaxed">Order it and get it delivered to your door</p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <a href="/products" className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow hover:bg-slate-700 focus:outline-none focus:ring active:bg-slate-500 sm:w-auto"                        >
                            Order now
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeBanner