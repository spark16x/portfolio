import React from 'react';

export default function Contact() {
  return (
    <section className="py-xl reveal" id="contact">
        <div className="max-w-3xl mx-auto bg-white p-xl rounded-3xl border border-outline-variant/30 shadow-xl text-center">
            <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg mb-md">
                Let's build something <span className="text-secondary">amazing</span>
            </h2>
            <p className="text-secondary font-body-lg mb-xl">Have an idea or project? I’d love to collaborate and turn
                it into a powerful digital experience.</p>
            <div className="flex flex-wrap justify-center gap-md">
                <a href="mailto:spark2009971@gmail.com"
                    className="px-xl py-md rounded-full border border-outline-variant text-primary magnetic-btn font-label-sm btn-fill btn-fill-primary"><span>Email
                        Me</span></a>
                <a href="https://github.com/spark16x"
                    className="px-xl py-md rounded-full border border-outline-variant text-primary magnetic-btn font-label-sm btn-fill btn-fill-primary"><span>GitHub</span></a>
                <a href="https://instagram.com/spark16.x"
                    className="px-xl py-md rounded-full border border-outline-variant text-primary magnetic-btn font-label-sm btn-fill btn-fill-primary"><span>Instagram</span></a>
                <a href="https://www.fiverr.com/s/Q7Lj2de"
                    className="px-xl py-md rounded-full bg-primary text-on-primary active:scale-95 magnetic-btn font-label-sm btn-fill btn-fill-inverse shadow-md"><span>Hire
                        Me</span></a>
            </div>
        </div>
    </section>
  );
}
