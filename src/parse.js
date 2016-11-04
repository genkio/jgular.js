'use strict';

function Lexer() {

}

/**
 * lex takes the original expression string 
 * and returns an array of tokens parsed from that string.
 * @param
 * "a + b"
 * @return
 * [
 *   {text: 'a', identifier: true},
 *   {text: '+'},
 *   {text: 'b', identifier: true}
 * ]
 */
Lexer.prototype.lex = function(text) {
  // Tokenization will be done here
};


function AST(lexer) {
  this.lexer = lexer;
}

/**
 * ast takes the array of tokens generated by the lexer 
 * and builds up an Abstract Syntax Tree (AST) from them.
 * The tree represents the syntactic structure of the expression as nested JavaScript objects.
 * @param
 * [
 *   {text: 'a', identifier: true},
 *   {text: '+'},
 *   {text: 'b', identifier: true}
 * ]
 * @return
 * {
 *   type: AST.BinaryExpression,
 *   operator: '+',
 *   left: {
 *     type: AST.Identifier,
 *     name: 'a' 
 *   },
 *   right: {
 *     type: AST.Identifier,
 *     name: 'b'
 *   } 
 * }
 */
AST.prototype.ast = function(text) {
  this.tokens = this.lexer.lex(text);
  // AST building will be done here
};


function ASTCompiler(astBuilder) {
  this.astBuilder = astBuilder;
}

/**
 * ast compile takes the abstract syntax tree 
 * and compiles it into a JavaScript function that evaluates the expression represented in the tree. 
 * @param
 * {
 *   type: AST.BinaryExpression,
 *   operator: '+',
 *   left: {
 *     type: AST.Identifier,
 *     name: 'a' 
 *   },
 *   right: {
 *     type: AST.Identifier,
 *     name: 'b'
 *   } 
 * }
 * @return
 * function(scope) {
 *   return scope.a + scope.b;
 * }
 */
ASTCompiler.prototype.compile = function(text) {
  var ast = this.astBuilder.ast(text);
  // AST compilation will be done here
};


/**
 * Parser constructs the complete parsing pipeline from the pieces outlined above. 
 */
function Parser(lexer) {
  this.lexer = lexer;
  this.ast = new AST(this.lexer);
  this.astCompiler = new ASTCompiler(this.ast);
}

/**
 * parse takes an Angular expression string
 * and returns a function that executes that expression in a certain context.
 * @param
 * "a + b"
 * @return
 * function(scope) {
 *   return scope.a + scope.b;
 * }
 */
Parser.prototype.parse = function(text) {
  return this.astCompiler.compile(text);
};


function parse(expr) {
  var lexer = new Lexer();
  var parser = new Parser(lexer);
  return parser.parse(expr);
}

module.exports = parse;