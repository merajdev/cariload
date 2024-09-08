export default function Contact() {
    return (
        <>
            <div className="max-w-lg mx-auto p-4 py-28 ">
                <div className="bg-white p-6 border rounded-md">
                    <h1 className="text-3xl text-center font-bold mb-6">Contact Us</h1>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm mb-1 font-medium text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm mb-1 font-medium text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm mb-1 font-medium text-gray-700" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="Type your message here"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
