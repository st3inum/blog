#include <bits/stdc++.h>
using namespace std;

bool isvowel(char ch) {
	return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';
}
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	int t; cin >> t; while (t--) {
		int n; string s; cin >> n >> s;

		long long ans = 0;
		unordered_map<int, int> cnt; cnt[0] = 1;
		for (int i = 1, V = 0; i <= n; i++) {
			V += isvowel(s[i - 1]);
			int A = 2 * V - i, B = 2 * V - i + 1;
			ans += cnt[B];
			cnt[A]++;
		}
		cout << ans << '\n';
	}
}