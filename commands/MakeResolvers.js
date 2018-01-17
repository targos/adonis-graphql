'use strict'

/**
 * adonis-graphql
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const _ = require('lodash')
const Config = use('Config')
const { join } = require('path')
const { Command } = require('@adonisjs/ace')

class MakeSchema extends Command {
  /**
   * Command signature required by ace.
   *
   * @return {string}
   */
  static get signature () {
    return `make:gresolvers { name: Name of resolvers }`
  }

  /**
   * Command description.
   *
   * @return {string}
   */
  static get description () {
    return 'Make a new GraphQL Resolvers'
  }

  /**
   * Method called when command is executed. This method will
   * require all files from the migrations directory
   * and execute all pending schema files.
   *
   * @param  {object}   args
   *
   * @return {void}
   */
  async handle ({ name }) {
    const templatePath = join(__dirname, '../commands/Resolvers.mustache')
    const filePath = join(Config.get('graphql.schema'), _.upperFirst(_.camelCase(name))) + '.js'
    const templateContent = await this.readFile(templatePath, 'utf-8')

    await this.generateFile(filePath, templatePath)

    const createdFile = filePath.replace(process.cwd(), '').replace(path.sep, '')
    console.log(`${this.icon('success')} ${this.chalk.green('create')}  ${createdFile}`)
  }
}

module.exports = MakeSchema
