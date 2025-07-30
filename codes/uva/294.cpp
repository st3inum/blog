#include <stdio.h>
#include <math.h>
#include <string.h>
#include <utility>
#include <algorithm>
using namespace std;

const int mx = 10002;
int nod[mx];
// segmented sieve for number of divisor
void sieve(int l, int r) {
	memset(nod, 0, sizeof nod);
	// in this part we are finding number of divisor of n , d such that d<=sqrt(n)
	for (int i = 1, sq; (sq = i * i) <= r; i++)
		for (int j = ((max(l, sq) + i - 1) / i) * i; j <= r; j += i)
			nod[j - l]++;
	for (int i = l, j = 0, sq = sqrt(i); i <= r; i++, j++) {
		nod[j] <<= 1; // double number of divisor of each values
		while (1LL * sq * sq <= i) sq++; // finding maximum sq
		while (1LL * sq * sq > i) sq--; // such that sq*sq<=i
		if (sq * sq == i) nod[j]--; // if i is a square number then number of divisor will be less than 1
	}
}
int main() {
	int t; scanf("%d", &t); while (t--) {
		int l, r; scanf("%d %d", &l, &r);
		sieve(l, r);
		pair<int, int> ma(0, 0);
		for (int i = l, j = 0; i <= r; i++, j++)
			ma = max(ma, make_pair(nod[j], -i));
		printf("Between %d and %d, %d has a maximum of %d divisors.\n", l, r, -ma.second, ma.first);
	} return 0;
}