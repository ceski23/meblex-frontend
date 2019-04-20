import React from 'react'

const Page = () => (
  <div>
    <section>
      <h2 className="title">Neque porro quisquam est</h2>
      <p>Lorem ipsum dolor sit amet, consectetur <b>adipiscing</b> elit. Nulla id mollis turpis. Quisque vitae risus urna. Curabitur <b>ante justo</b>, pellentesque quis pretium at, semper vel erat. Nulla tortor quam, mollis.</p>
      <p>Quis odio sit amet, <b>interdum sagittis</b> urna. Mauris porttitor ornare neque, non congue leo congue sit amet. Aliquam auctor <b>consectetur</b> lectus a auctor.</p>
      
      <div>
        <button>Learn more</button>
        <button className="secondary">Learn more</button>
      </div>
    </section>
      
    <section className="gray">
      <div className="card">
        <h3 className="title">Lorem ipsum dolor</h3>
        <p>Lorem ipsum dolor sit amet, consectetur <b>adipiscing</b> elit. Nulla id mollis turpis.</p>
        <p>Quisque vitae risus urna. Curabitur <b>ante justo</b>, pellentesque quis pretium at, semper vel erat.</p>
      </div>
    </section>

    <section className="gray">
      <div className="card">
        <h3 className="title">Lorem ipsum dolor</h3>
        <p>Lorem ipsum dolor sit amet, consectetur <b>adipiscing</b> elit. Nulla id mollis turpis.</p>
        <p>Quisque vitae risus urna. Curabitur <b>ante justo</b>, pellentesque quis pretium at, semper vel erat.</p>
      </div>
    </section>
  </div>
)

export default Page;