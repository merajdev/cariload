import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

export default function SupportHelp() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "How can I track my order?",
      answer: "You can track your order by going to the 'Track My Order' page and entering your order ID.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit cards, PayPal, mobile money, and cash on delivery.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact us using the form below or via our 24/7 chat support.",
    },
  ]);

  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [dispute, setDispute] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const toggleFaq = (index: number) => {
    setSelectedFaq(selectedFaq === index ? null : index);
  };

  const handleDisputeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDispute(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Support request submitted!');
  };

  return (
    <div className="bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Support & Help</h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* FAQs */}
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <ul className="mb-6">
          {faqs.map((faq, index) => (
            <li key={index} className="mb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-2 bg-gray-200 rounded-md font-medium"
              >
                {faq.question}
              </button>
              {selectedFaq === index && (
                <p className="p-4 bg-gray-100 rounded-md mt-2">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>

        {/* Contact Support */}
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={message}
            onChange={handleMessageChange}
            className="w-full p-4 mb-4 border border-gray-300 rounded-md"
            placeholder="Describe your issue or question..."
            rows={4}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>

        {/* Order Disputes */}
        <h2 className="text-xl font-semibold mb-4">Order Disputes</h2>
        <textarea
          value={dispute}
          onChange={handleDisputeChange}
          className="w-full p-4 mb-4 border border-gray-300 rounded-md"
          placeholder="Describe the issue with your order..."
          rows={4}
          required
        />
        <button
          onClick={() => alert('Order dispute submitted!')}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Raise Dispute
        </button>
      </div>
    </div>
  );
}
