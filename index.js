

const Alexa = require('ask-sdk-core');

const HELP = "Pregúntame dónde estás, qué quieres hacer, qué quieres examinar. Como te puedo ayudar?";
const DEFAULT_REPROMPT = "Que quieres hacer ahora?";
const GOODBYE = "Todavia no descubres que fue lo que me pasó. no te vayas!"
+ "seguro que quieres dejarme aqui?";
const IMAGE_URLS = {
  "techo": "https://www.bcd-urbex.com/wp-content/uploads/2014/03/IMG_1730_1_2_3_4_5_6_tonemapped3.jpg",
  "camara": "https://i.etsystatic.com/5339749/r/il/7ff4c6/331463059/il_794xN.331463059.jpg",
  "nota": "https://www.pngfind.com/pngs/m/33-339645_note-old-paper-old-background-for-presentation-hd.png",
  "puerta": "https://cdn.imgbin.com/12/12/25/imgbin-rust-combination-lock-code-door-door-bR  n nmkH2SjRvqiG2u2ADVB0VMR5kg.jpg",
  "diario": "data:image/jpeg;base64,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"
};

const LaunchRequestHandler = {

  canHandle(handlerInput) {
          
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  
      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'LaunchRequestHandler')

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'techo');
  
                
  },
  handle(handlerInput) {
   
    const speechText =
    "<audio src='soundbank://soundlibrary/horror/horror_04'/>"
  +"<amazon:effect name='whispered'>"
  +"Ayudame. Tardaste mucho en despertar"
  +"<break time='1s'/>"
  +" Me preocupaste. De seguro te preguntas en donde te encuentras, es una habitación vieja, llena de suciedad. Las paredes se están cayendo lentamente,"
  +" la lluvia entra por un hoyo en el techo goteando cerca de la cama donde estás."
  +" Ha de ser muy extraño para ti"
  +"<break time='1s'/>"
  +" Tienes que salir de aquí antes de que te pase lo mismo que a mí."
  +"</amazon:effect>" ;

        if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  //"terapiaimagen": IMAGE_URLS['techo']
                                }
                            })
                }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(HELP)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }

};

const InicioIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'InicioIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'cuarto');
  },
  handle(handlerInput) {
    const speechText = "<amazon:effect name='whispered'>" 
    +"¿No recuerdas? soy Alexa tu mejor amiga, nos conocimos desde que nacimos. Hace un año me trajeron aquí." 
    +" No volví"
    +"<break time='1s'/>" 
    +" y creo que por eso estás aquí."
    +"</amazon:effect>"
;
 if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  "terapiaDeShockData": {
                                    "properties": {
                                      "terapiaimagen": IMAGE_URLS['cuarto']
                                        }
                                      }
                                    }
                                })
                }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }
};

const ExaminarHoja = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ExaminarHoja'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'nota');
  },
  handle(handlerInput) {
    const speechText = "<amazon:effect name='whispered'>"
    +"Hay unas palabras escritas en un papel que parece nuevo comparándolo con lo demás."
    +"<audio src='soundbank://soundlibrary/cloth_leather_paper/paper/paper_10'/>"
    +"Dice: Ficha del Paciente dos Incompleta. No viene el nombre, el paciente padece de esquizofrenia paranoide. Extremadamente peligroso."
    +"</amazon:effect>";
    
     if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  "terapiaDeShockData": {
                                    "properties": {
                                      "terapiaimagen": IMAGE_URLS['nota']
                                        }
                                      }
                                    }
                                })
                }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }
};

const ExaminarPuerta = {
  canHandle(handlerInput) {
   return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ExaminarPuerta'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'puerta');
  },
  
  handle(handlerInput) {
    const speechText =  "<audio src='soundbank://soundlibrary/office/amzn_sfx_typing_medium_01'/>"
    +" <audio src='soundbank://soundlibrary/machines/servos/servos_08'/>"
    + "<amazon:effect name='whispered'>"
    +"La puerta parece tener seguro para abrirla, al parecer necesitamos una contraseña de cuatro dígitos. La respuesta debe estar en algún lugar de este cuarto."
    +"</amazon:effect>"
;
     if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  "terapiaDeShockData": {
                                    "properties": {
                                     "terapiaimagen": IMAGE_URLS['puerta']
                                        }
                                      }
                                    }
                                })
                }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }
};

const ExaminarCuarto = {
  canHandle(handlerInput) {
       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ExaminarCuarto'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'cuarto');
  },
  
  handle(handlerInput) {
    const speechText = "<audio src'soundbank://soundlibrary/doors/doors_glass/glass_06'/>"
    +"<amazon:effect name='whispered'>"
+"Las ventanas tienen barrotes, saltar no es una opción."
+"..Pero recuerdo haber dejado algo útil por aquí"
   +" </amazon:effect>";
    if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  "terapiaDeShockData": {
                                    "properties": {
                                      "terapiaimagen": IMAGE_URLS['cuarto']
                                        }
                                      }
                                    }
                                })
                }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }
};

const ExaminarLampara = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ExaminarLampara'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'techo');
  },
  handle(handlerInput) {
    const speechText = "<amazon:effect name='whispered'>"
+"Estoy tocando la lámpara por dentro, está llena de polvo"
"<break time='1s'/>"
+"Espera, creo que toqué algo"
"<break time='1s'/>"
+"Hay un papel que dice cinco, ocho, dos, nueve. Con mucho amor, las chicas de I.T.C"

+"</amazon:effect>"
;
 if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  "terapiaDeShockData": {
                                    "properties": {
                                      "terapiaimagen": IMAGE_URLS['techo']
                                        }
                                      }
                                    }
                                })
                }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }
};

const ExaminarChamarra = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ExaminarChamarra'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'nota');
  },
  handle(handlerInput) {
    const speechText = "<amazon:effect name='whispered'>"
+"Dentro de la bolsa de la chamarra hay un pequeño papel que tiene el número ocho escrito en él"
+"</amazon:effect>"

;
 if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  "terapiaDeShockData": {
                                    "properties": {
                                      "terapiaimagen": IMAGE_URLS['nota']
                                        }
                                      }
                                    }
                                })
                }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }
};

const PistaHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'Pista';
  },
  handle(handlerInput) {
    const speechText = "<amazon:effect name='whispered'>"
+"Solía pasar mucho tiempo viendo esas paredes."
+"</amazon:effect>"
;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }
};
const ExaminarCama = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ExaminarCama'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'cuarto');
  },
  handle(handlerInput) {
    const speechText = "<amazon:effect name='whispered'>"
+"Hay un papel con el número nueve dentro del colchón."
+"</amazon:effect>";
 if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  "terapiaDeShockData": {
                                    "properties": {
                                      "terapiaimagen": IMAGE_URLS['techo']
                                        }
                                      }
                                    }
                                })
                }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
      
  }
};

const ExaminarPared = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ExaminarPared'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'cuarto');
  },
  handle(handlerInput) {
    const speechText = "<amazon:effect name='whispered'>"
    +"Veo una abertura en la pared."
    +" Hay una nota con el numero cinco"
   +" </amazon:effect>"
;
 if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  "terapiaDeShockData": {
                                    "properties": {
                                      "terapiaimagen": IMAGE_URLS['techo']
                                        }
                                      }
                                    }
                                })
                }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }
};



const ExaminarCalentador = {
  canHandle(handlerInput) {
       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ExaminarCalentador'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'diario');
  },
  handle(handlerInput) {
    const speechText =  "<amazon:effect name='whispered'>"
          +"Hay un cuaderno en una de las ranuras."
          +"<audio src='soundbank://soundlibrary/cloth_leather_paper/books/books_01'/>"
           +"Se parece a mi letra. 3 de junio de 1989."
           +"<break time='1s'/>"
           +" Estoy cansada, siento que el tiempo ya no existe. Llevo cinco días aquí, no puedo salir y no sé si algún día voy a poder cruzar esa puerta."
           +"<break time='1s'/>"
           +"6 de junio de 1989."
           +"<break time='1s'/>"
           +"La lluvia entra por el techo, me moja la cara. Estoy muriendo de frío, intento taparme con mi chamarra pero no sirve de algo si está empapada."
           +"</amazon:effect>";
           +"<break time='1s'/>"
           +"7 de junio de 1989."
           +"<break time='1s'/>"
           +"Me han diagnosticado con esquizofrenia, creo que están intentando convencerme de que lo soy. Lo estoy empezando a creer. Dos veces al día me medican con algo que me hace no sentir. No vivo."
           +"<break time='1s'/>"
           +"1 de julio de 1989."
           +"<break time='1s'/>"
           +"Mis ojos se están cerrando. No puedo mover nada más que mi mano. Llevo nueve horas encerrada en la sala de electroshock. Dejaré esto con la esperanza de que sepan la verdad."
           +"<break time='1s'/>"
 if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  "terapiaDeShockData": {
                                    "properties": {
                                      "terapiaimagen": IMAGE_URLS['diario']
                                        }
                                      }
                                    }
                                })
                }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }
};
      
const QueVeo = {
  canHandle(handlerInput) {
   return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'QueVeo'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'cuarto');
  },
  handle(handlerInput) {
    const speechText = "<amazon:effect name='whispered'>" 
    +"La habitación parece ser misteriosa, el moho.. cubre las paredes y el piso."
    +" Estás acostado en una cama, .. hay cintas de restricción de movimiento al lado de tus brazos, parece que  se soltaron"
    +"<break time='1s'/>"
    +" A lo lejos puedes ver una mesa vieja y encima se encuentra una hoja de papel."
    +"<break time='1s'/>"
   +" La pared tiene una abertura particularmente grande, escondida..entre el moho y la suciedad..."
    +" Hay un marco de un espejo que está recargado en la pared,.. parece estar completamente roto."
   +" Un calentador inservible se encuentra debajo de una ventana abarrotada...."
    +" Hojas de papel regadas en el piso húmedo,... la mayoría están rotas.."
   +"Hay una chamarra verde que cuelga en un perchero de madera,.." 
    +" La única salida del cuarto es por una puerta de metal,. con un dispositivo extraño pegado a ella."
    +" Deberíamos investigar cómo salir de aquí."
     +"</amazon:effect>"
;
 if (supportsAPL(handlerInput)) {
                         handlerInput.responseBuilder
                            .addDirective({
                                type: 'Alexa.Presentation.APL.RenderDocument',
                                document: require('./launch.json'),
                                datasources: {
                                  "terapiaDeShockData": {
                                    "properties": {
                                      "terapiaimagen": IMAGE_URLS['cuarto']
                                        }
                                      }
                                    }
                                })
                }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Terapia de Shock', speechText)
      .getResponse();
  }
};





const GoodbyeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(GOODBYE)
      .reprompt(GOODBYE)
      .withSimpleCard('Terapia de Shock', GOODBYE)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(GOODBYE)
      .withSimpleCard('Terapia de Shock', GOODBYE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('El item no se encuentra disponible')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP)
      .reprompt(HELP)
      .withSimpleCard('Terapia de Shock', HELP)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
      LaunchRequestHandler,
      InicioIntent,
      ExaminarHoja,
      ExaminarPuerta,
      ExaminarCuarto,
      ExaminarCama,
      ExaminarPared,
      ExaminarCalentador,
      QueVeo,
      GoodbyeIntentHandler,
      PistaHandler,
      HelpIntentHandler,
      CancelAndStopIntentHandler,
      SessionEndedRequestHandler,
      ExaminarChamarra,
      ExaminarLampara,
      ErrorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
  function supportsAPL(handlerInput) {
    const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface !== null && aplInterface !== undefined;
}
