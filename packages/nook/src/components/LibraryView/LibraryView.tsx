"use client";

import React from "react";
import { View, Text, Loader, Divider, Table, Badge, Alert } from "reshaped"
import Markdown from 'react-markdown';

import { ComponentDoc, PropItem } from "react-docgen-typescript";
import { eventsEmitter } from "../../utilities/emitter/emitter";
import { useNook } from "../NookProvider";

type Results = {
  [x: string]: {
    nookComponents: string[];
    documentation: ComponentDoc[];
    executionTime: string;
  };
}

const LibraryView = () => {
  const { libraryComponents: components } = useNook();

  const componentsArray = Object.entries(components).filter(([k, v]) => {
    return v.nookComponents.length > 0
  });

  const getDefaultValue = (prop: PropItem) => {
    if (prop.defaultValue) {
      if (typeof prop.defaultValue === "object" && prop.defaultValue !== null) {
        return prop.defaultValue.value;
      }
    }

    return "-";
  }

  return (
    <View padding={3}>
      {componentsArray.length === 0 && (
        <Loader size='small' />
      )}
      {
        componentsArray.map(([k, v], i) => {
          return (
            <div key={k}>
              <Text variant="body-3" weight="medium">{v.nookComponents[0]}</Text>
              <View gap={2} direction='row' align='start'>
                <Text variant="caption-1" weight="regular">{k as string}</Text>
                <Badge size='small' variant='faded' color='positive'>{v.executionTime}</Badge>
              </View>
              <br />
              {v.documentation && v.documentation[0] && Object.values(v.documentation[0].props).length > 0 ? (
                <>
                  <Table>
                    <Table.Row>
                      <Table.Heading>Name</Table.Heading>
                      <Table.Heading>Description</Table.Heading>
                      <Table.Heading>Default</Table.Heading>
                    </Table.Row>
                    {Object.values(v.documentation[0].props).map((prop) => {
                      return (
                        <Table.Row key={prop.name}>
                          <Table.Cell>
                            {prop.name}
                            {' '}
                            {prop.required && (
                              <Badge size='small' variant='faded' color='primary'>Required</Badge>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <View gap={2} direction='column' align='start'>
                              {prop.description && <Text variant='caption-1'><Markdown>{prop.description}</Markdown></Text>}
                              <Badge size='small' variant='faded'>{prop.type.name}</Badge>
                            </View>
                          </Table.Cell>
                          <Table.Cell><Badge size='small' variant='faded'>{getDefaultValue(prop)}</Badge></Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table>
                </>
              ) : (
                <Alert>No props</Alert>
              )}
              {i !== componentsArray.length - 1 && (
                <>
                  <br />
                  <Divider />
                </>
              )}
            </div>
          )
        })
      }
    </View>
  )
}

export default LibraryView;