#include <iostream>
#include <algorithm>
using namespace std;

const int mx = 2e6 + 5;
int pi[mx], K;
long long P[mx];
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	// sieve [0,mx-1]
	for (int i = 4; i < mx; i += 2)pi[i] = 1;
	for (int i = 3; i * i < mx; i += 2)if (!pi[i])
			for (int j = i * i; j < mx; j += i + i)pi[j] = 1;
	for (int i = 2; i < mx; i++)pi[i] = pi[i - 1] + !pi[i];

	// generating smallest mx'th palindromic number
	for (int i = 1; K < mx; i++) {
		long long s = i, ss = i, n = i, nn = i / 10;
		while (nn)ss = ss * 10 + nn % 10, nn /= 10;
		while (n)s = s * 10 + n % 10, n /= 10;
		P[K++] = ss;
		if (ss != s && K < mx)P[K++] = s;
	} sort(P, P + mx);

	long long p, q; cin >> p >> q;
	for (int i = mx - 1, j = i; i; i--) {
		// j=index of the maximum palindrome
		// which is smaller or equal than i;
		while (j >= 0 && P[j] > i)j--;
		if (q * pi[i] <= p * (j + 1)) {
			cout << i << '\n', exit(0);
		}
	} cout << "Palindromic tree is better than splay tree\n";
}