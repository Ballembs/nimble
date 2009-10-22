/*
 *  Nimble, an extensive application base for Grails
 *  Copyright (C) 2009 Intient Pty Ltd
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package intient.nimble.domain

import org.codehaus.groovy.grails.commons.ConfigurationHolder

import intient.nimble.domain.Permission
import intient.nimble.domain.UserBase
import intient.nimble.domain.Group

/**
 * Represents a role within a Nimble application
 *
 * @author Bradley Beddoes
 */
class Role {

    String name
    String description
    boolean protect = false

    Date dateCreated
    Date lastUpdated

    static hasMany = [
        users: UserBase,
        groups: Group,
        permissions: Permission
    ]

    static belongsTo = [Group]

    static mapping = {
        cache usage: 'read-write', include: 'all'
        table ConfigurationHolder.config.nimble.tablenames.role

        users cache: true
        groups cache: true
        permissions cache: true, cascade: 'none'
    }

    static constraints = {
        name(blank: false, unique: true, minSize:4, maxSize: 255)
        description(nullable:true, blank:false)
        
        dateCreated(nullable: true) // must be true to enable grails
        lastUpdated(nullable: true) // auto-inject to be useful which occurs post validation

        permissions(nullable:true)
    }
}
