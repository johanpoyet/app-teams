import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import { app } from "@microsoft/teams-js";
import axios from "axios";


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


    // async function fetchPokemon(name) {
    //   const pokemonQuery = `
    //     query PokemonInfo($name: String) {
    //       pokemon(name: $name) {
    //         id
    //         number
    //         name
    //         image
    //         attacks {
    //           special {
    //             name
    //             type
    //             damage
    //           }
    //         }
    //       }
    //     }
    //   `

    //   const response = await window.fetch('https://graphql-pokemon2.vercel.app/', {
    //     // learn more about this API here: https://graphql-pokemon2.vercel.app/
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json;charset=UTF-8',
    //     },
    //     body: JSON.stringify({
    //       query: pokemonQuery,
    //       variables: {name: name.toLowerCase()},
    //     }),
    //   })

    //   const {data, errors} = await response.json()
    //   if (response.ok) {
    //     const pokemon = data?.pokemon
    //     if (pokemon) {
    //       // add fetchedAt helper (used in the UI to help differentiate requests)
    //       pokemon.fetchedAt = formatDate(new Date())
    //       return pokemon
    //     } else {
    //       return Promise.reject(new Error(`No pokemon with the name "${name}"`))
    //     }
    //   } else {
    //     // handle the graphql errors
    //     const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
    //     return Promise.reject(error)
    //   }
    // }
    // document.getElementById('bonjour').onClick() = function() {
    //     fetchPokemon('pikachu').then(data => document.getElementById('test').innerHTML = data.name);
    // }

    //     useEffect(() => {
    //         if (inTeams === true) {
    //             app.notifySuccess();
    //         } else {
    //             setEntityId("Not in Microsoft Teams");
    //         }
    //     }, [inTeams]);

    //     useEffect(() => {
    //         if (context) {
    //             setEntityId(context.page.id);
    //         }
    //     }, [context]);

    //     fetch("https://pokeapi.co/api/v2/pokemon/entei")

    // function redirect() {
    //     useEffect(() => {
    //         const timeout = setTimeout(() => {
    //             window.location.replace("http://google.fr");
    //         }, 2000);

    //         return () => clearTimeout(timeout);
    //     }, []);
    // }
    // redirect();

    /**
     * The render() method to create the UI of the tab
     */
    return (
        // <Provider theme={theme}>
        //     <Flex fill={true} column styles={{
        //         padding: ".8rem 0 .8rem .5rem"
        //     }}>
        //         <Flex.Item>
        //             <Header content="This is your tab" />
        //         </Flex.Item>
        //         <Flex.Item>
        //             <div>
        //                 <div>
        //                     <Text content={entityId} />
        //                 </div>

        //                 <div>
        //                     <Button onClick={() => alert("It worked!")}>A sample button</Button>
        //                 </div>
        //                 <div>
        //                     <Button>test</Button>
        //                 </div>
        //                 <div>
        //                     <p id="test"></p>
        //                 </div>
        //             </div>
        //         </Flex.Item>
        //         <Flex.Item styles={{
        //             padding: ".8rem 0 .8rem .5rem"
        //         }}>
        //             <Text size="smaller" content="(C) Copyright bsoft" />
        //         </Flex.Item>
        //     </Flex>
        // </Provider>

        <Provider theme={theme}>
            <div className="app-container">
                <div className="nav"></div>
                <header>
                    <img
                        src="https://bsoft.fr/wp-content/uploads/2020/05/bsoft_simple.png"
                        alt="logo-blue"
                        style={{ width: "200px" }}
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
                        alt="logo teams"
                        style={{ width: "150px" }}
                    />
                </header>
                <div className="main">
                    <form onSubmit={(e) => connect(e)}>
                        <input
                            type="email"
                            placeholder="Entrez votre e-mail..."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input type="password" name="" id="" placeholder="**********" />
                        <input type="submit" value="ENVOYER" />
                    </form>
                </div>
            </div>
        </Provider>


    );
};