import * as React from "react";
import { Provider, Flex, Text, Button, Header, Input, Image, Form, FormInput } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import { app } from "@microsoft/teams-js"
import axios from "axios";
import * as $ from 'jquery';




/**
 * Implementation of the app-teamsTab content page
 */

// const Component = () => {
//   function pokemon(e: any) {
//     console.log("hi " + e)
//   }
//   return (
//     <div>
//       <button onClick={(e) => pokemon(e)}></button>
//     </div>
//   )
// }
// export default Component

export const AppTeamsTab = () => {

    const [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();
    const [email, setEmail] = useState<string>("");

    const formatDate = date =>
        `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
            date.getSeconds(),
        ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

    useEffect(() => {
        if (inTeams === true) {
            app.notifySuccess();
        } else {
            setEntityId("Not in Microsoft Teams");
        }
    }, [inTeams]);
    // CONTEXT
    useEffect(() => {
        if (context) {
            setEntityId(context.page.id);
        }
    }, [context]);

    // CALL API
    // login-info connect to API
    const connect = (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append("email", email);
        data.append("device_uid", "device-01-postman");
        data.append("device_name", "postman");
        data.append("organization_id", "1");
        data.append("type", "connect");
        data.append("send_method", "email");
        const config = {
            method: "post",
            url: "https://formation.preprod2.bsoft.fr/api/login/info",
            data,
        };
        axios(config)
            .then((res) => {
                console.log(res);
                alert("Vous allez être redirigé vers la page d'accueil bformation");
                // location.href = "https://formation.bienvenue.pro/login";
            })
            .catch(function (error) {
                if (error) {

                    alert(error);
                    console.log(error)

                }
            });
    };
    const GetTeamsToken = () => {
        microsoftTeams.initialize(window as any);

        microsoftTeams.authentication.getAuthToken({
            successCallback: resultAccessToken => {
                $('#TeamsTokens').text("bonjour");
                $("#btnServerSideToken").show();
            },
            failureCallback: reason => {
                $('#Error').text(reason);
            }
        });



    }






    GetTeamsToken();


    const GetServerSideToken = () => {
        $("#btnConsent").hide();
        var teamsToken = $('#TeamsTokens').text();
        $.ajax({
            url: window.location.origin.toLowerCase() + "/token",
            headers: {
                'Authorization': 'bearer ' + teamsToken
            },
            type: "get",
            success: function (result, status) {
                $('#AccessToken').text(result);
                console.log(result);
            },
            error: function (result, status, error) {
                let resultObject = JSON.parse(result.responseText);
                $('#Error').text(error + ":" + resultObject.errorCode);
                if (resultObject.errorCode === "invalid_grant" || resultObject.errorCode === "unauthorized_client") {
                    $("#btnConsent").show();
                    $("#btnServerSideToken").hide();

                }

            }

        });

    }


    const MSALRequestConsent = () => {
        microsoftTeams.authentication.authenticate({
            url: window.location.origin + "/appTeamsTab/authPopupRedirect.html",
            width: 1024,
            height: 1024,
            successCallback: (result) => {
                $('#AccessToken').text(result);
                $("#btnServerSideToken").show();
            },
            failureCallback: (reason) => {
                $('#Error').text(reason);
            }
        });

    }






    return (




        <Provider theme={theme}>

            <div className="app-container">
                <div className="nav"></div>
                <Header>
                    <b>Jeton SSO : </b>
                    <div id="TeamsTokens"></div>

                    <button id="btnServerSideToken" onClick={() => GetServerSideToken()}>
                        Demande le Jeton  d'accès (OBO)
                    </button>
                    <button id="btnConsent" onClick={() => MSALRequestConsent()}>
                        Consentements utilisateurs
                    </button>

                    <button id="btnConsent" onClick={() => GetTeamsToken()}>
                        clique batard
                    </button>


                    <Image
                        src="https://bsoft.fr/wp-content/uploads/2020/05/bsoft_simple.png"
                        alt="logo-blue"
                        style={{ width: "200px" }}
                    />
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
                        alt="logo teams"
                        style={{ width: "150px" }}
                    />
                </Header>
                <div className="main">
                    <Form onSubmit={(e) => connect(e)}>
                        <input
                            type="email"
                            placeholder="Entrez votre e-mail..."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <FormInput type="password" name="" id="" placeholder="**********" />
                        {/* <input type="submit" value="ENVOYER" /> */}
                        <FormInput type="submit" value="ENVOYER"></FormInput>

                    </Form>
                </div>
            </div>
        </Provider>





    );
};