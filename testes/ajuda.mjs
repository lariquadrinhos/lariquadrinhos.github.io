// Monta uma raiz de projeto temporária: a mesma moldura, os mesmos tokens, e conteúdo que
// cada teste pode trocar. A construção roda sobre ela, nunca sobre a raiz de verdade.

import { mkdtempSync, cpSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { construir } from '../construcao/construir.mjs';

export const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

export function raizTemporaria(trocas = {}) {
  const raiz = mkdtempSync(join(tmpdir(), 'portfolio-'));
  for (const item of ['modelo', 'publico', 'docs/spec', 'quem-sou-eu.md',
    'case-study-financas-pf-pj.md', 'case-study-reembolso-sulamerica.md']) {
    cpSync(join(RAIZ, item), join(raiz, item), { recursive: true });
  }
  for (const [arquivo, mudar] of Object.entries(trocas)) {
    const original = readFileSync(join(raiz, arquivo), 'utf8');
    writeFileSync(join(raiz, arquivo), typeof mudar === 'function' ? mudar(original) : mudar);
  }
  return raiz;
}

// Uma raiz com o inglês (decisão 242): os três .en.md são cópias do português, para provar o
// mecanismo (endereços, idioma, controle, âncoras, interface) sem depender da tradução, que
// é dela e entra no repositório só depois de aprovada. Trocas valem depois da cópia.
export function raizComIngles(trocas = {}) {
  const raiz = raizTemporaria();
  for (const arquivo of ['quem-sou-eu.md', 'case-study-financas-pf-pj.md', 'case-study-reembolso-sulamerica.md']) {
    // Os rótulos da trilha mudam na cópia, como mudam na tradução: as âncoras têm de vir do
    // português mesmo assim.
    const copia = readFileSync(join(raiz, arquivo), 'utf8').replace(/<!-- trilha: ([^>]*?) -->/g, '<!-- trilha: $1 in English -->');
    writeFileSync(join(raiz, arquivo.replace(/\.md$/, '.en.md')), copia);
  }
  for (const [arquivo, mudar] of Object.entries(trocas)) {
    const original = readFileSync(join(raiz, arquivo), 'utf8');
    writeFileSync(join(raiz, arquivo), typeof mudar === 'function' ? mudar(original) : mudar);
  }
  return raiz;
}

export function construirEm(raiz, modo = 'local') {
  const saida = join(raiz, 'site');
  const resultado = construir({ raiz, saida, modo });
  const pagina = (caminho) => readFileSync(join(saida, caminho), 'utf8');
  return { ...resultado, saida, pagina };
}

// O texto visível de um trecho de HTML: sem tags, com espaços normalizados.
export const texto = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
