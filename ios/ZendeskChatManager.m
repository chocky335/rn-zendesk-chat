//
//  ZendeskChatManager.m
//  ZendeskChatSDK
//
//  Created by Bohdan Pomohaibo on 3/31/18.
//  Copyright © 2018 Facebook. All rights reserved.
//


#import <React/RCTBridgeModule.h>
#import <ZDCChat/ZDCChat.h>

@interface RCT_EXTERN_MODULE(ZendeskChatManager, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)withAccountKey)

RCT_EXTERN_METHOD(setUser:(NSDictionary *)user)

RCT_EXTERN_METHOD(start: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
