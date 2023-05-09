import React from "react";

import "../issuer.css";

<img src ="https://i.imgur.com/mEEYFwS.png" />
export const Intro = () => {

    return (

        <div className="intro-container">
            <div className="intro">
                <p>
                    Automated Ticketing demonstrates a functional website that allows a user to send, receive, and respond to tickets from fellow companions. This can be through work, school, or just to use on a daily basis. Not only can you send tickets, but we implemented a color scheming system that allows the user to scheme their own tickets to their liking.

                </p>
            </div>

            <div className="running-instructions">
                    <p>
                    Step 1. Navigate to the add ticket tab and submit away!
                    </p>
                    <p>
                    Step 2. You will be redirected to the Issuer user interface to submit a ticket ID and are free to chat.
                    </p>
                    <p>
                    Step 3. Navigate to the Responder tab and respond to your fellow compainions by searching up the ID's that are listed.
                    </p>


            </div>
            <div className="Logo">
            <img src ="https://i.imgur.com/mEEYFwS.png" />
            </div>
        </div>

    );


};

export default Intro;