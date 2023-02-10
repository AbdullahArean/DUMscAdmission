
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign In</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
</head>
    <body >
    <div class="bg-white dark:bg-gray-900 h-screen">

        <section className="bg-white dark:bg-gray-900 h-screen flex flex-col justify-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
                404
                </h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Something's missing.
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, we can't find that page. You'll find lots to explore on the
                home page.{" "}
                </p>
                <button
                onClick={toHome}
                className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
                >
                Back to Dashboard
                </button>
            </div>
            </div>
        </section>

</div>
    </body>
</html>