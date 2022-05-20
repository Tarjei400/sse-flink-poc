/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const http = require("http");

const {
  StateFun,
  Message,
  Context,
  messageBuilder,
  egressMessageBuilder,
} = require("apache-flink-statefun");

// ------------------------------------------------------------------------------------------------------
// Greeter
// ------------------------------------------------------------------------------------------------------

const GreetRequestType = StateFun.jsonType("example/GreetRequest");
const EgressRecordType = StateFun.jsonType(
  "io.statefun.playground/EgressRecord"
);

/**
 * A Stateful function that represents a person.
 *
 * @param {Context} context a StateFun context.
 * @param {Message} message the input message.
 * @returns {Promise<void>}
 */
async function person(context, message) {
  // update the visit count
  try {
    let request = message.as(GreetRequestType);
    let visits = context.storage.visits;

    if (request.idle) {
      if (visits < 10) {
        console.log("You are idle man");
      }
      return;
    }

    visits += 1;
    context.storage.visits = visits;

    // enrich the request with the number of vists.
    request.visits = visits;
    console.log(context, request);
    // next, we will forward a message to a special greeter function,
    // that will compute a super-doper-personalized greeting based on the
    // number of visits that this person has.
    context.sendAfter(
      10000,
      messageBuilder({
        typename: "example/person",
        id: request.name,
        value: {
          idle: true,
          ...request,
        },
        valueType: GreetRequestType,
      })
    );

    console.log(`Hello there ${context.self.id}!`);

    context.send(
      messageBuilder({
        typename: "example/greeter",
        id: request.name,
        value: request,
        valueType: GreetRequestType,
      })
    );
  } catch (e) {
    console.error(e);
  }
}

async function greeter(context, message) {
  const request = message.as(GreetRequestType);
  const person_name = request.name;
  const visits = request.visits;

  const greeting = await compute_fancy_greeting(person_name, visits);
  const egressRecord = {
    topic: "greetings",
    payload: greeting,
  };

  context.send(
    egressMessageBuilder({
      typename: "io.statefun.playground/egress",
      value: egressRecord,
      valueType: EgressRecordType,
    })
  );
}

async function compute_fancy_greeting(name, seen) {
  if (seen === 0) {
    return "";
  } else if (seen === 1) {
    return `Welcome ${name}`;
  } else if (seen === 2) {
    return `Nice to see you again ${name}`;
  } else if (seen === 3) {
    return `Third time is a charm ${name}`;
  } else {
    return `Nice to see you at the ${seen}-nth time ${name}!`;
  }
}

// ------------------------------------------------------------------------------------------------------
// Bind all the functions
// ------------------------------------------------------------------------------------------------------

let statefun = new StateFun();

statefun.bind({
  typename: "example/person",
  fn: person,
  specs: [
    {
      name: "visits",
      type: StateFun.intType(),
    },
  ],
});

statefun.bind({
  typename: "example/greeter",
  fn: greeter,
});

// ------------------------------------------------------------------------------------------------------
// Serve all the functions
// ------------------------------------------------------------------------------------------------------

const server = http.createServer(statefun.handler()).listen(8000);
console.log("Created server! Listening on 8000");
server.on("error", function (err) {
  console.error(err);
});
