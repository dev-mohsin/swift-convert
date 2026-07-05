# Contributing to SwiftConvert

Thanks for your interest in contributing! SwiftConvert is open source and welcomes contributions of all kinds.

## How to Contribute

### Report Bugs

- Open an [issue](https://github.com/dev-mohsin/swift-convert/issues) with steps to reproduce
- Include browser, OS, and file type if relevant
- Screenshots help a lot

### Suggest Features

- Open an [issue](https://github.com/dev-mohsin/swift-convert/issues) with the "feature request" label
- Describe the use case, not just the solution

### Submit Code

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test locally with `npm run dev`
5. Commit with a clear message
6. Push and open a Pull Request

### What You Can Work On

- New file format support (e.g., SVG, TIFF, GIF)
- UI/UX improvements
- Performance optimizations
- Accessibility improvements
- Documentation and translations
- Bug fixes

## Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/swift-convert.git
cd swift-convert
npm install
npm run dev
```

Open http://localhost:3000

### Optional: LibreOffice

Only needed for DOC/DOCX to PDF conversion:

```bash
# macOS
brew install --cask libreoffice

# Ubuntu/Debian
apt install libreoffice
```

## Code Style

- TypeScript with strict mode
- Tailwind CSS for styling
- Keep components simple, avoid over-abstraction
- Server components by default, client components only when needed

## Pull Request Guidelines

- Keep PRs focused on a single change
- Add a clear description of what and why
- Make sure `npm run build` passes
- Test on both desktop and mobile

## Questions?

Open an issue or use the [feedback form](https://swift-convert-chi.vercel.app/feedback).
