import React, { useState } from 'react'
import './Coustomer_Imformation.css'
import Dining from './Dining'
import TakeAway from './TakeAway'
import Delivery from './Delivery'



const Coustomer_Imformation = () => {
    const [activeTab, setActiveTab] = useState('dining')

    return (
        <div style={{ width: "35%" }}  >
            <div className='layout_head px-3'>Customer Impformation</div>
            <div style={{ borderRadius: "0px", borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px", }} className='mainInner mb-3'>
                <div className="mainIneerSection m-3">
                    <div className="common-tabs-wrap">
                        <ul class="nav nav-tabs common-tabs">
                            <li class=""><a data-toggle="tab" href="dining" onClick={() => setActiveTab("dining")}>Dining</a></li>
                            <li><a data-toggle="tab" href="takeAway" onClick={() => setActiveTab("takeAway")}>TakeAway</a></li>
                            <li><a data-toggle="tab" href="delivery " onClick={() => setActiveTab("delivery")}>Delivery</a></li>
                        </ul>

                        <div class="tab-content addProduct__basicTabs">
                            <div id="home" class="tab-pane fade in active show">
                                {activeTab === 'dining' ? <Dining /> : ''}
                            </div>
                            <div id="menu1" class="tab-pane fade active show">
                                {activeTab === 'takeAway' ? <TakeAway /> : ''}
                            </div>
                            <div id="menu2" class="tab-pane fade active show">
                                {activeTab === 'delivery' ? <Delivery /> : ''}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Coustomer_Imformation