import { extractCritical } from '@emotion/server'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document<{ ids: number[]; css: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const page = await ctx.renderPage()
    const styles = extractCritical(page.html)

    return { ...initialProps, ...page, ...styles }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style data-emotion-css={this.props.ids.join(' ')} dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
