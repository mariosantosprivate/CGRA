EditDistance(P,T) {
// inicialização
for j = 0 to |T| do D[j] = j // D[0,j]
// recorrência
for i = 1 to |P| do
old = D[0] // guarda D[i-1,0]
D[0] = i // inicializa D[i, 0]
for j = 1 to |T| do
if P[i] == T[j] then new = old
else new = 1 + min(old,
D[j],
D[j-1])
old = D[j]
D[j] = new
// finalização
return D[|T|]
}