export default function AboutPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-century-gold">About Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Century Security UK
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Century Security UK is a leading security company based in Yorkshire, with over 20 years of experience in the industry. We pride ourselves on our commitment to excellence and integrity, which has helped us establish a strong reputation in a competitive market.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Approach</h3>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We believe in making a positive change in the security sector by prioritising fair compensation for our staff, addressing long-standing issues that have affected the industry for years. Our team is not only well-trained but also valued, ensuring they can perform at their best.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                This commitment enables us to attract and retain top talent in the security industry, ensuring our clients receive the highest quality service.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Experience</h3>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our directors bring substantial experience from local authorities, infusing our company with essential knowledge and values, including equity, diversity, and inclusion (EDI), along with rigorous safeguarding protocols.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We understand that every client has unique security needs, which is why we offer a range of services that can be customised to meet specific requirements.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Commitment</h3>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Century Security UK, we are committed to providing professional, reliable security services while maintaining the highest standards of integrity and professionalism. Our team is fully licensed and regularly trained to ensure they stay up-to-date with the latest security practices and regulations.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We take pride in our ability to adapt to changing security needs and challenges, always putting our clients' safety and satisfaction first.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 