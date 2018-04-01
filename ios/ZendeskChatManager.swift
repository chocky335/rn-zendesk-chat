//
//  ZendeskChatManager.swift
//  ZendeskChatManager
//
//  Created by Bohdan Pomohaibo on 3/31/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import UIKit
import ZDCChat

@objc(ZendeskChatManager)
class ZendeskChatManager: NSObject {
  @objc(initialize:)
  func initialize(withAccountKey: String) -> Void {
    DispatchQueue.main.async {
      ZDCChat.initialize(withAccountKey: withAccountKey);
    }
  }
  
  @objc(setUser:)
  func setUser(user: NSDictionary) -> Void {
    DispatchQueue.main.async {
      ZDCChat.updateVisitor(
        { (_ visitor: ZDCVisitorInfo!) -> Void in
          if (user["name"] != nil) {
            visitor.name = user["name"] as! String
          }
          if (user["email"] != nil) {
            visitor.email = user["email"] as! String
          }
          if (user["phone"] != nil) {
            visitor.phone = user["phone"] as! String
          }
          if (user["shouldPersist"] != nil) {
            visitor.shouldPersist = user["shouldPersist"] as! Bool
          }
        }
      );
    }
  }
  
  @objc
  func start(_ resolve: @escaping RCTPromiseResolveBlock,
                     rejecter reject: RCTPromiseRejectBlock) -> Void {
    DispatchQueue.main.async {
      ZDCChat.start(nil)

      resolve(true)
    }
  }
}
