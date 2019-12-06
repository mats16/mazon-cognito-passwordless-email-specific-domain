// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { CognitoUserPoolTriggerHandler } from 'aws-lambda';

const { ALLOWED_DOMAINS } = process.env
if (ALLOWED_DOMAINS) {
    var allowedDomains = ALLOWED_DOMAINS.split(',')
} else {
    var allowedDomains: string[] = []
}

export const handler: CognitoUserPoolTriggerHandler = async event => {
    const { email } = event.request.userAttributes;
    const domain = email.split('@')[1];
    if (allowedDomains.includes(domain)) {
      event.response.autoConfirmUser = true;
    } else {
      event.response.autoConfirmUser = false;
    }
    (event.response as any).autoVerifyEmail = true;
    return event;
};
